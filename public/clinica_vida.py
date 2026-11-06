pacientes = []

def cadastrar_paciente():
    nome = input("Nome: ").strip()
    idade = int(input("Idade: "))
    telefone = input("Telefone: ").strip()
    pacientes.append({"nome": nome, "idade": idade, "telefone": telefone})
    print("Paciente cadastrado com sucesso!")

def ver_estatisticas():
    if not pacientes:
        print("Nenhum paciente cadastrado.")
        return
    idades = [p["idade"] for p in pacientes]
    print(f"Total: {len(pacientes)}")
    print(f"Idade média: {sum(idades) / len(idades):.1f}")
    print(f"Mais novo: {min(idades)} anos")
    print(f"Mais velho: {max(idades)} anos")

def buscar_paciente():
    nome = input("Nome para buscar: ").strip().lower()
    encontrados = [p for p in pacientes if nome in p["nome"].lower()]
    print(encontrados or "Paciente não encontrado.")

def listar_pacientes():
    for paciente in pacientes:
        print(paciente)

while True:
    print("\\n1. Cadastrar paciente\\n2. Ver estatísticas\\n3. Buscar paciente pelo nome\\n4. Listar todos\\n5. Sair")
    opcao = input("Escolha: ").strip()
    try:
        if opcao == "1": cadastrar_paciente()
        elif opcao == "2": ver_estatisticas()
        elif opcao == "3": buscar_paciente()
        elif opcao == "4": listar_pacientes()
        elif opcao == "5": break
        else: print("Opção inválida.")
    except ValueError: print("Digite uma idade válida.")
