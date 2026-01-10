import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'

describe('App - Integration Tests', () => {
  beforeEach(() => {
    // Limpar o DOM antes de cada teste
  })

  describe('1. Botão de IA - Sugestão de Meta', () => {
    it('deve ter animação e sugerir nome para a primeira meta', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Preenche campos de contexto (Problemas e Objetivos)
      await user.type(
        screen.getByPlaceholderText(/descreva o principal problema/i),
        'Dificuldade de comunicação verbal'
      )
      await user.type(
        screen.getByPlaceholderText(/descreva o resultado esperado/i),
        'Melhorar comunicação em sala de aula'
      )

      // Clica no botão de sugestão de meta
      const suggestButton = screen.getByRole('button', { name: /sugestão de meta/i })
      await user.click(suggestButton)

      // Verifica se o nome da PRIMEIRA META foi preenchido (aguarda até 10s)
      await waitFor(
        () => {
          const goalNameInputs = screen.getAllByPlaceholderText(/ex: comunicação verbal/i)
          const firstGoalInput = goalNameInputs[0] as HTMLInputElement
          expect(firstGoalInput.value).toBe('Comunicação verbal na sala de aula')
        },
        { timeout: 10000 }
      )
    }, 15000)
  })

  describe('2. Botão de IA - Sugestão de Níveis', () => {
    it('deve validar nome da meta antes de sugerir níveis', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Tenta sugerir níveis sem preencher nome da meta
      const suggestLevelsButton = screen.getByRole('button', { name: /sugestão de níveis/i })
      await user.click(suggestLevelsButton)

      // Deve mostrar erro
      expect(
        await screen.findByText(/informe o nome da meta antes de sugerir níveis/i, {}, { timeout: 10000 })
      ).toBeInTheDocument()
    }, 15000)

    it('deve ter animação e autopreencher níveis quando meta tem nome', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Preenche nome da meta
      const goalNameInput = screen.getByPlaceholderText(/ex: comunicação verbal/i)
      await user.type(goalNameInput, 'Comunicação verbal na sala de aula')

      // Clica em sugerir níveis
      const suggestLevelsButton = screen.getByRole('button', { name: /sugestão de níveis/i })
      await user.click(suggestLevelsButton)

      // Aguarda preenchimento dos níveis (até 10s)
      await waitFor(
        () => {
          const level2Input = screen.getByPlaceholderText(
            /ex: paciente apresentou excepcional progresso/i
          ) as HTMLInputElement
          expect(level2Input.value).toContain('Paciente apresentou excepcional progresso')
        },
        { timeout: 10000 }
      )
    }, 15000)
  })

  describe('3. Botão Deletar Meta (quando 2+ metas)', () => {
    it('não deve exibir botão de deletar quando há apenas 1 meta', async () => {
      render(<App />)

      // Não deve ter botão de deletar quando há apenas 1 meta
      expect(screen.queryByRole('button', { name: /deletar meta/i })).not.toBeInTheDocument()
    }, 10000)

    it('deve exibir botão de deletar quando há 2 ou mais metas', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Adiciona segunda meta
      const addButton = screen.getByRole('button', { name: /nova meta/i })
      await user.click(addButton)

      // Agora deve ter botão de deletar
      await waitFor(
        () => {
          const deleteButtons = screen.queryAllByRole('button', { name: /deletar meta/i })
          expect(deleteButtons.length).toBeGreaterThan(0)
        },
        { timeout: 5000 }
      )
    }, 10000)

    it('deve deletar meta corretamente', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Adiciona segunda meta
      await user.click(screen.getByRole('button', { name: /nova meta/i }))

      // Verifica que tem 2 metas (usando testid para evitar confusão com labels de níveis)
      await waitFor(() => {
        const metaTitles = screen.getAllByTestId(/^goal-title-/)
        expect(metaTitles).toHaveLength(2)
      })

      // Deleta uma meta
      const deleteButton = screen.getAllByRole('button', { name: /deletar meta/i })[0]
      await user.click(deleteButton)

      // Verifica que voltou para 1 meta
      await waitFor(() => {
        const metaTitles = screen.getAllByTestId(/^goal-title-/)
        expect(metaTitles).toHaveLength(1)
      })
    }, 10000)
  })

  describe('4. Validações Obrigatórias para Salvar GAS', () => {
    it('deve validar Nome da GAS (obrigatório)', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Tenta salvar sem preencher Nome da GAS
      const saveButton = screen.getByRole('button', { name: /salvar gas/i })
      await user.click(saveButton)

      // Deve mostrar erro
      expect(
        await screen.findByText(/informe o nome da gas/i, {}, { timeout: 5000 })
      ).toBeInTheDocument()
    }, 10000)

    it('deve validar Paciente (obrigatório)', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Preenche apenas Nome da GAS
      const gasNameInput = screen.getByPlaceholderText(/ex: gas - mobilidade/i)
      await user.type(gasNameInput, 'Minha GAS')

      // Tenta salvar sem selecionar paciente
      const saveButton = screen.getByRole('button', { name: /salvar gas/i })
      await user.click(saveButton)

      // Deve mostrar erro de paciente
      expect(
        await screen.findByText(/selecione o paciente/i, {}, { timeout: 5000 })
      ).toBeInTheDocument()
    }, 10000)

    it('deve validar Celular (obrigatório)', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Preenche Nome da GAS
      const gasNameInput = screen.getByPlaceholderText(/ex: gas - mobilidade/i)
      await user.type(gasNameInput, 'Minha GAS')

      // Seleciona paciente
      const patientButton = screen.getByText(/ex: bruce wayne/i)
      await user.click(patientButton)
      const bruceOption = await screen.findByText('Bruce Wayne', {}, { timeout: 5000 })
      await user.click(bruceOption)

      // Tenta salvar sem telefone
      const saveButton = screen.getByRole('button', { name: /salvar gas/i })
      await user.click(saveButton)

      // Deve mostrar erro de telefone
      expect(
        await screen.findByText(/informe o telefone/i, {}, { timeout: 5000 })
      ).toBeInTheDocument()
    }, 15000)

    it('deve validar ao menos 1 meta completa (todos os campos)', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Preenche Nome, Paciente e Telefone
      const gasNameInput = screen.getByPlaceholderText(/ex: gas - mobilidade/i)
      await user.type(gasNameInput, 'Minha GAS')

      const patientButton = screen.getByText(/ex: bruce wayne/i)
      await user.click(patientButton)
      const bruceOption = await screen.findByText('Bruce Wayne', {}, { timeout: 5000 })
      await user.click(bruceOption)

      const phoneInput = screen.getByPlaceholderText(/ex: \(21\) 97143-7438/i)
      await user.type(phoneInput, '21971437438')

      // Tenta salvar sem preencher meta completa
      const saveButton = screen.getByRole('button', { name: /salvar gas/i })
      await user.click(saveButton)

      // Deve mostrar erro de metas
      expect(
        await screen.findByText(/preencha todos os campos da meta/i, {}, { timeout: 5000 })
      ).toBeInTheDocument()
    }, 15000)

    it('deve salvar com sucesso quando todos os campos obrigatórios estão preenchidos', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Preenche Nome da GAS
      const gasNameInput = screen.getByPlaceholderText(/ex: gas - mobilidade/i)
      await user.type(gasNameInput, 'GAS Completa')

      // Seleciona paciente
      const patientButton = screen.getByText(/ex: bruce wayne/i)
      await user.click(patientButton)
      const bruceOption = await screen.findByText('Bruce Wayne', {}, { timeout: 5000 })
      await user.click(bruceOption)

      // Preenche telefone
      const phoneInput = screen.getByPlaceholderText(/ex: \(21\) 97143-7438/i)
      await user.type(phoneInput, '21971437438')

      // Preenche meta completa (nome + 5 níveis)
      const goalNameInput = screen.getByPlaceholderText(/ex: comunicação verbal/i)
      await user.type(goalNameInput, 'Meta de teste')

      const levelInputs = [
        screen.getByPlaceholderText(/ex: paciente apresentou excepcional progresso/i),
        screen.getByPlaceholderText(/ex: paciente superou a meta alcançando 10-12 vezes/i),
        screen.getByPlaceholderText(/ex: paciente atingiu a meta de 8 vezes/i),
        screen.getByPlaceholderText(/ex: paciente aumentou a frequência para 4-5 vezes/i),
        screen.getByPlaceholderText(/ex: paciente não conseguiu iniciar os exercícios/i),
      ]

      for (let i = 0; i < levelInputs.length; i++) {
        await user.type(levelInputs[i], `Nivel ${i + 1}`)
      }

      // Salva
      const saveButton = screen.getByRole('button', { name: /salvar gas/i })
      await user.click(saveButton)

      // Deve mostrar modal de sucesso
      expect(
        await screen.findByText(/gas salva com sucesso/i, {}, { timeout: 5000 })
      ).toBeInTheDocument()
    }, 20000)
  })

  describe('5. Funcionalidades Adicionais', () => {
    it('deve adicionar nova meta', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Conta metas iniciais usando testid
      const initialMetaTitles = screen.getAllByTestId(/^goal-title-/)
      const initialCount = initialMetaTitles.length

      // Clica em adicionar meta
      const addButton = screen.getByRole('button', { name: /nova meta/i })
      await user.click(addButton)

      // Verifica se aumentou
      await waitFor(() => {
        const metaTitles = screen.getAllByTestId(/^goal-title-/)
        expect(metaTitles.length).toBe(initialCount + 1)
      })
    }, 10000)

    it('deve duplicar meta com todos os campos preenchidos', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Preenche nome da primeira meta
      const goalNameInput = screen.getByPlaceholderText(/ex: comunicação verbal/i)
      await user.type(goalNameInput, 'Meta original')

      // Preenche todos os 5 níveis
      const level2Input = screen.getByPlaceholderText(/ex: paciente apresentou excepcional progresso/i)
      const level1Input = screen.getByPlaceholderText(/ex: paciente superou a meta alcançando 10-12 vezes/i)
      const level0Input = screen.getByPlaceholderText(/ex: paciente atingiu a meta de 8 vezes/i)
      const levelMinus1Input = screen.getByPlaceholderText(/ex: paciente aumentou a frequência para 4-5 vezes/i)
      const levelMinus2Input = screen.getByPlaceholderText(/ex: paciente não conseguiu iniciar os exercícios/i)

      await user.type(level2Input, 'Nivel +2 original')
      await user.type(level1Input, 'Nivel +1 original')
      await user.type(level0Input, 'Nivel 0 original')
      await user.type(levelMinus1Input, 'Nivel -1 original')
      await user.type(levelMinus2Input, 'Nivel -2 original')

      // Clica em duplicar
      const duplicateButton = screen.getByRole('button', { name: /duplicar meta/i })
      await user.click(duplicateButton)

      // Verifica se a meta foi duplicada (nome e níveis)
      await waitFor(
        () => {
          const allGoalNames = screen.getAllByDisplayValue('Meta original')
          const allLevel2Inputs = screen.getAllByDisplayValue('Nivel +2 original')
          const allLevel1Inputs = screen.getAllByDisplayValue('Nivel +1 original')
          const allLevel0Inputs = screen.getAllByDisplayValue('Nivel 0 original')
          const allLevelMinus1Inputs = screen.getAllByDisplayValue('Nivel -1 original')
          const allLevelMinus2Inputs = screen.getAllByDisplayValue('Nivel -2 original')

          // Nome e cada nível devem aparecer 2 vezes (original + cópia)
          expect(allGoalNames).toHaveLength(2)
          expect(allLevel2Inputs).toHaveLength(2)
          expect(allLevel1Inputs).toHaveLength(2)
          expect(allLevel0Inputs).toHaveLength(2)
          expect(allLevelMinus1Inputs).toHaveLength(2)
          expect(allLevelMinus2Inputs).toHaveLength(2)
        },
        { timeout: 5000 }
      )
    }, 15000)

    it('deve aplicar máscara de telefone ao digitar', async () => {
      const user = userEvent.setup()
      render(<App />)

      const phoneInput = screen.getByPlaceholderText(/ex: \(21\) 97143-7438/i)

      // Digita apenas números
      await user.type(phoneInput, '21971437438')

      // Deve formatar automaticamente
      await waitFor(() => {
        expect(phoneInput).toHaveValue('(21) 97143-7438')
      })
    }, 10000)

    it('deve permitir selecionar baseline da meta', async () => {
      const user = userEvent.setup()
      render(<App />)

      // Seleciona baseline nível -1
      const baselineNegative1 = screen.getByLabelText(/nível -1/i)
      await user.click(baselineNegative1)
      
      await waitFor(() => {
        expect(baselineNegative1).toBeChecked()
      })

      // Seleciona baseline nível 0
      const baseline0 = screen.getByLabelText(/nível 0/i)
      await user.click(baseline0)
      
      await waitFor(() => {
        expect(baseline0).toBeChecked()
        expect(baselineNegative1).not.toBeChecked()
      })
    }, 10000)
  })
})
