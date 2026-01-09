import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'

describe('App - Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllTimers()
    vi.useFakeTimers()
  })

  describe('Fluxo de Sugestão de Meta', () => {
    it('deve validar campos obrigatórios antes de sugerir meta', async () => {
      const user = userEvent.setup({ delay: null })
      render(<App />)

      // Tenta sugerir meta sem preencher campos
      const suggestButton = screen.getByRole('button', { name: /sugestão de meta/i })
      await user.click(suggestButton)

      // Deve mostrar erros
      expect(await screen.findByText(/preencha o campo problemas/i)).toBeInTheDocument()
      expect(await screen.findByText(/preencha o campo objetivos/i)).toBeInTheDocument()
    })

    it('deve sugerir meta quando campos estão preenchidos', async () => {
      const user = userEvent.setup({ delay: null })
      render(<App />)

      // Preenche campos necessários
      const problemsField = screen.getByPlaceholderText(/descreva o principal problema/i)
      const objectivesField = screen.getByPlaceholderText(/descreva o resultado esperado/i)

      await user.type(problemsField, 'Dificuldade de comunicação verbal')
      await user.type(objectivesField, 'Melhorar comunicação em sala de aula')

      // Clica em sugerir meta
      const suggestButton = screen.getByRole('button', { name: /sugestão de meta/i })
      await user.click(suggestButton)

      // Deve mostrar loading
      expect(await screen.findByText(/gerando sugestão/i)).toBeInTheDocument()

      // Avança o timer (simulação de 2 segundos)
      vi.advanceTimersByTime(2000)

      // Aguarda atualização
      await waitFor(() => {
        // Verifica se o nome da meta foi preenchido
        const nameInput = screen.getByPlaceholderText(/ex: gas - mobilidade/i) as HTMLInputElement
        expect(nameInput.value).toBe('Comunicação verbal na sala de aula')
      })

      // Verifica se o loading sumiu
      expect(screen.queryByText(/gerando sugestão/i)).not.toBeInTheDocument()
    })
  })

  describe('Fluxo de Gerenciamento de Metas', () => {
    it('deve adicionar nova meta', async () => {
      const user = userEvent.setup({ delay: null })
      render(<App />)

      // Conta metas iniciais (deve ter 1)
      const initialMetaTitles = screen.getAllByText(/^meta \d+$/i)
      expect(initialMetaTitles).toHaveLength(1)

      // Clica em adicionar meta
      const addButton = screen.getByRole('button', { name: /nova meta/i })
      await user.click(addButton)

      // Verifica se tem 2 metas agora
      const updatedMetaTitles = screen.getAllByText(/^meta \d+$/i)
      expect(updatedMetaTitles).toHaveLength(2)
    })

    it('deve duplicar meta existente', async () => {
      const user = userEvent.setup({ delay: null })
      render(<App />)

      // Preenche nome da primeira meta
      const goalNameInputs = screen.getAllByPlaceholderText(/ex: comunicação verbal/i)
      await user.type(goalNameInputs[0], 'Minha meta teste')

      // Clica em duplicar
      const duplicateButton = screen.getByRole('button', { name: /duplicar meta/i })
      await user.click(duplicateButton)

      // Verifica se a meta foi duplicada com "(cópia)"
      expect(await screen.findByDisplayValue(/minha meta teste \(cópia\)/i)).toBeInTheDocument()
    })

    it('não deve permitir deletar a única meta', async () => {
      const user = userEvent.setup({ delay: null })
      render(<App />)

      // Não deve ter botão de deletar quando há apenas 1 meta
      expect(screen.queryByRole('button', { name: /deletar meta/i })).not.toBeInTheDocument()
    })

    it('deve deletar meta quando há mais de uma', async () => {
      const user = userEvent.setup({ delay: null })
      render(<App />)

      // Adiciona segunda meta
      const addButton = screen.getByRole('button', { name: /nova meta/i })
      await user.click(addButton)

      // Verifica que tem 2 metas
      expect(screen.getAllByText(/^meta \d+$/i)).toHaveLength(2)

      // Agora deve ter botão de deletar
      const deleteButtons = screen.getAllByRole('button', { name: /deletar meta/i })
      expect(deleteButtons).toHaveLength(1) // Apenas na segunda meta

      // Deleta a segunda meta
      await user.click(deleteButtons[0])

      // Verifica que voltou para 1 meta
      expect(screen.getAllByText(/^meta \d+$/i)).toHaveLength(1)
    })
  })

  describe('Fluxo de Sugestão de Níveis', () => {
    it('deve validar nome da meta antes de sugerir níveis', async () => {
      const user = userEvent.setup({ delay: null })
      render(<App />)

      // Tenta sugerir níveis sem preencher nome da meta
      const suggestLevelsButton = screen.getByRole('button', { name: /sugestão de níveis/i })
      await user.click(suggestLevelsButton)

      // Deve mostrar erro
      expect(
        await screen.findByText(/informe o nome da meta antes de sugerir níveis/i)
      ).toBeInTheDocument()
    })

    it('deve sugerir níveis quando meta tem nome', async () => {
      const user = userEvent.setup({ delay: null })
      render(<App />)

      // Preenche nome da meta
      const goalNameInput = screen.getByPlaceholderText(/ex: comunicação verbal/i)
      await user.type(goalNameInput, 'Comunicação verbal na sala de aula')

      // Clica em sugerir níveis
      const suggestLevelsButton = screen.getByRole('button', { name: /sugestão de níveis/i })
      await user.click(suggestLevelsButton)

      // Deve mostrar loading
      expect(await screen.findByText(/gerando sugestão/i)).toBeInTheDocument()

      // Avança timer
      vi.advanceTimersByTime(2000)

      // Aguarda preenchimento dos níveis
      await waitFor(() => {
        const level2Input = screen.getByPlaceholderText(
          /ex: paciente apresentou excepcional progresso/i
        ) as HTMLInputElement
        expect(level2Input.value).toContain('Paciente apresentou excepcional progresso')
      })
    })
  })

  describe('Fluxo de Validação e Salvamento', () => {
    it('deve validar campos obrigatórios ao salvar', async () => {
      const user = userEvent.setup({ delay: null })
      render(<App />)

      // Tenta salvar sem preencher nada
      const saveButton = screen.getByRole('button', { name: /salvar gas/i })
      await user.click(saveButton)

      // Deve mostrar erros
      expect(await screen.findByText(/informe o nome da gas/i)).toBeInTheDocument()
    })

    it('deve validar seleção de paciente', async () => {
      const user = userEvent.setup({ delay: null })
      render(<App />)

      // Preenche apenas o nome da GAS
      const gasNameInput = screen.getByPlaceholderText(/ex: gas - mobilidade/i)
      await user.type(gasNameInput, 'Minha GAS')

      // Tenta salvar
      const saveButton = screen.getByRole('button', { name: /salvar gas/i })
      await user.click(saveButton)

      // Deve mostrar erro de paciente
      expect(await screen.findByText(/selecione o paciente/i)).toBeInTheDocument()
    })

    it('deve validar telefone', async () => {
      const user = userEvent.setup({ delay: null })
      render(<App />)

      // Preenche nome e seleciona paciente
      const gasNameInput = screen.getByPlaceholderText(/ex: gas - mobilidade/i)
      await user.type(gasNameInput, 'Minha GAS')

      const patientSelect = screen.getByRole('combobox', { name: /paciente/i })
      await user.selectOptions(patientSelect, 'bruce')

      // Tenta salvar sem telefone
      const saveButton = screen.getByRole('button', { name: /salvar gas/i })
      await user.click(saveButton)

      // Deve mostrar erro de telefone
      expect(await screen.findByText(/informe o telefone/i)).toBeInTheDocument()
    })

    it('deve validar metas completas', async () => {
      const user = userEvent.setup({ delay: null })
      render(<App />)

      // Preenche campos básicos
      const gasNameInput = screen.getByPlaceholderText(/ex: gas - mobilidade/i)
      await user.type(gasNameInput, 'Minha GAS')

      const patientSelect = screen.getByRole('combobox', { name: /paciente/i })
      await user.selectOptions(patientSelect, 'bruce')

      const phoneInput = screen.getByPlaceholderText(/ex: \(21\) 97143-7438/i)
      await user.type(phoneInput, '21971437438')

      // Tenta salvar sem preencher meta completa
      const saveButton = screen.getByRole('button', { name: /salvar gas/i })
      await user.click(saveButton)

      // Deve mostrar erro de metas
      expect(
        await screen.findByText(/preencha todos os campos da meta/i)
      ).toBeInTheDocument()
    })

    it('deve salvar com sucesso quando tudo está preenchido', async () => {
      const user = userEvent.setup({ delay: null })
      render(<App />)

      // Preenche todos os campos necessários
      const gasNameInput = screen.getByPlaceholderText(/ex: gas - mobilidade/i)
      await user.type(gasNameInput, 'Minha GAS Completa')

      const patientSelect = screen.getByRole('combobox', { name: /paciente/i })
      await user.selectOptions(patientSelect, 'bruce')

      const phoneInput = screen.getByPlaceholderText(/ex: \(21\) 97143-7438/i)
      await user.type(phoneInput, '21971437438')

      // Preenche meta
      const goalNameInput = screen.getByPlaceholderText(/ex: comunicação verbal/i)
      await user.type(goalNameInput, 'Meta de teste')

      // Preenche todos os 5 níveis
      const levelInputs = [
        screen.getByPlaceholderText(/ex: paciente apresentou excepcional progresso/i),
        screen.getByPlaceholderText(/ex: paciente superou a meta alcançando 10-12 vezes/i),
        screen.getByPlaceholderText(/ex: paciente atingiu a meta de 8 vezes/i),
        screen.getByPlaceholderText(/ex: paciente aumentou a frequência para 4-5 vezes/i),
        screen.getByPlaceholderText(/ex: paciente não conseguiu iniciar os exercícios/i),
      ]

      for (let i = 0; i < levelInputs.length; i++) {
        await user.type(levelInputs[i], `Nível ${i + 1} preenchido`)
      }

      // Salva
      const saveButton = screen.getByRole('button', { name: /salvar gas/i })
      await user.click(saveButton)

      // Deve mostrar modal de sucesso
      expect(await screen.findByText(/gas salva com sucesso/i)).toBeInTheDocument()

      // Clica em OK
      const okButton = screen.getByRole('button', { name: /ok/i })
      await user.click(okButton)

      // Modal deve fechar
      await waitFor(() => {
        expect(screen.queryByText(/gas salva com sucesso/i)).not.toBeInTheDocument()
      })

      // Formulário deve estar resetado
      const resetGasNameInput = screen.getByPlaceholderText(
        /ex: gas - mobilidade/i
      ) as HTMLInputElement
      expect(resetGasNameInput.value).toBe('')
    })
  })

  describe('Fluxo de Máscara de Telefone', () => {
    it('deve aplicar máscara de telefone ao digitar', async () => {
      const user = userEvent.setup({ delay: null })
      render(<App />)

      const phoneInput = screen.getByPlaceholderText(/ex: \(21\) 97143-7438/i)

      // Digita apenas números
      await user.type(phoneInput, '21971437438')

      // Deve formatar automaticamente
      expect(phoneInput).toHaveValue('(21) 97143-7438')
    })

    it('deve limitar a 11 dígitos', async () => {
      const user = userEvent.setup({ delay: null })
      render(<App />)

      const phoneInput = screen.getByPlaceholderText(/ex: \(21\) 97143-7438/i)

      // Tenta digitar mais de 11 dígitos
      await user.type(phoneInput, '219714374389999')

      // Deve limitar a 11 dígitos formatados
      expect(phoneInput).toHaveValue('(21) 97143-7438')
    })
  })

  describe('Fluxo de Seleção de Baseline', () => {
    it('deve permitir selecionar baseline da meta', async () => {
      const user = userEvent.setup({ delay: null })
      render(<App />)

      // Seleciona baseline nível -1
      const baselineNegative1 = screen.getByLabelText(/nível -1/i)
      await user.click(baselineNegative1)

      expect(baselineNegative1).toBeChecked()

      // Seleciona baseline nível 0
      const baseline0 = screen.getByLabelText(/nível 0/i)
      await user.click(baseline0)

      expect(baseline0).toBeChecked()
      expect(baselineNegative1).not.toBeChecked()
    })
  })

  describe('Fluxo Completo E2E', () => {
    it('deve completar fluxo inteiro: sugerir meta, preencher, salvar', async () => {
      const user = userEvent.setup({ delay: null })
      render(<App />)

      // 1. Preenche problemas e objetivos
      await user.type(
        screen.getByPlaceholderText(/descreva o principal problema/i),
        'Dificuldade de comunicação'
      )
      await user.type(
        screen.getByPlaceholderText(/descreva o resultado esperado/i),
        'Melhorar comunicação'
      )

      // 2. Sugere meta
      await user.click(screen.getByRole('button', { name: /sugestão de meta/i }))

      vi.advanceTimersByTime(2000)

      await waitFor(() => {
        const nameInput = screen.getByPlaceholderText(/ex: gas - mobilidade/i) as HTMLInputElement
        expect(nameInput.value).toBe('Comunicação verbal na sala de aula')
      })

      // 3. Sugere níveis da meta
      await user.click(screen.getByRole('button', { name: /sugestão de níveis/i }))

      vi.advanceTimersByTime(2000)

      await waitFor(() => {
        const level2 = screen.getByPlaceholderText(
          /ex: paciente apresentou excepcional progresso/i
        ) as HTMLInputElement
        expect(level2.value).toBeTruthy()
      })

      // 4. Preenche dados do paciente
      await user.selectOptions(screen.getByRole('combobox', { name: /paciente/i }), 'bruce')
      await user.type(screen.getByPlaceholderText(/ex: \(21\) 97143-7438/i), '21971437438')

      // 5. Salva
      await user.click(screen.getByRole('button', { name: /salvar gas/i }))

      // 6. Verifica sucesso
      expect(await screen.findByText(/gas salva com sucesso/i)).toBeInTheDocument()
    })
  })
})
