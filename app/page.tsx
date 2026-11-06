'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, BarChart3, BookOpen, CalendarDays, Check, ChevronDown, CircleHelp, ClipboardList, Download, FileText, GitBranch, HeartPulse, Menu, Printer, Search, Sparkles, Users, X } from 'lucide-react'

type Task = { id: number; title: string; tag: string; checked: boolean; comments: number }
const initialColumns: Record<string, Task[]> = {
  Backlog: [{ id: 1, title: 'Verificar cadastro do paciente', tag: 'Análise', checked: false, comments: 2 }, { id: 2, title: 'Definir regras de atendimento', tag: 'Lógica', checked: false, comments: 1 }],
  'Sprint Atual': [{ id: 3, title: 'Montar tabela-verdade', tag: 'Passo 3', checked: true, comments: 3 }, { id: 4, title: 'Escrever algoritmo FIFO', tag: 'Passo 4', checked: false, comments: 0 }],
  'Em Progresso': [{ id: 5, title: 'Desenhar casos de uso', tag: 'UML', checked: false, comments: 4 }],
  Concluído: [{ id: 6, title: 'Criar estrutura do projeto', tag: 'Setup', checked: true, comments: 1 }],
}
const navItems = [['Visão geral', 'overview'], ['1. Planejamento', 'sprint'], ['2. Python', 'python'], ['3. Lógica', 'logic'], ['4. FIFO', 'fifo'], ['5. UML', 'uml']] as const

function SectionTitle({ eyebrow, title, description, icon: Icon }: { eyebrow: string; title: string; description: string; icon: any }) {
  return <div className="section-title"><div className="eyebrow"><Icon size={15} /> {eyebrow}</div><h2>{title}</h2><p>{description}</p></div>
}

function TruthTable({ emergency = false }: { emergency?: boolean }) {
  const rows = useMemo(() => Array.from({ length: 16 }, (_, i) => { const A = Boolean(i & 8), B = Boolean(i & 4), C = Boolean(i & 2), D = Boolean(i & 1); const result = emergency ? C && (B || D) : (A && B && C) || (B && C && D); return [A, B, C, D, result] }), [emergency])
  const total = rows.filter(r => r[4]).length
  return <div className="table-wrap"><table><thead><tr>{['A','B','C','D', emergency ? 'C ∧ (B ∨ D)' : '(A ∧ B ∧ C) ∨ (B ∧ C ∧ D)'].map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((v, j) => <td key={j} className={j === 4 ? (v ? 'true' : 'false') : ''}>{v ? 'V' : 'F'}</td>)}</tr>)}</tbody><tfoot><tr><td colSpan={5}><strong>{total} de 16</strong> situações liberam o atendimento</td></tr></tfoot></table></div>
}

export default function Page() {
  const [active, setActive] = useState('overview'); const [mobileOpen, setMobileOpen] = useState(false); const [columns, setColumns] = useState(initialColumns); const [search, setSearch] = useState('')
  const moveTask = (id: number, from: string, to: string) => { const task = columns[from].find(t => t.id === id); if (!task) return; setColumns(c => ({ ...c, [from]: c[from].filter(t => t.id !== id), [to]: [...c[to], task] })) }
  const printPage = () => window.print()
  const download = (name: string, content: string, type = 'text/plain') => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([content], { type })); a.download = name; a.click(); URL.revokeObjectURL(a.href) }
  const filtered = (items: Task[]) => items.filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
  return <div className="app-shell">
    <aside className={mobileOpen ? 'sidebar open' : 'sidebar'}><div className="brand"><div className="brand-mark"><HeartPulse size={20} /></div><div><strong>Clínica Vida<span>+</span></strong><small>Projeto acadêmico</small></div><button className="close-menu" onClick={() => setMobileOpen(false)} aria-label="Fechar menu"><X size={18} /></button></div><div className="nav-label">Navegação</div><nav>{navItems.map(([label, id], index) => <button key={id} className={active === id ? 'nav-item active' : 'nav-item'} onClick={() => { setActive(id); setMobileOpen(false) }}><span className="nav-number">{index === 0 ? <Sparkles size={15} /> : String(index)}</span>{label}{active === id && <ArrowRight size={14} className="nav-arrow" />}</button>)}</nav><div className="sidebar-bottom"><div className="progress-label"><span>Progresso do projeto</span><b>68%</b></div><div className="progress"><span style={{ width: '68%' }} /></div><p>4 de 6 entregas concluídas</p><div className="team"><div className="avatar">CV</div><div><strong>Equipe Vida+</strong><small>Trabalho em grupo</small></div></div></div></aside>
    <main className="main-content"><header className="topbar"><button className="menu-button" onClick={() => setMobileOpen(true)} aria-label="Abrir menu"><Menu size={20} /></button><div className="crumb">Clínica Vida+ <span>/</span> <b>{navItems.find(n => n[1] === active)?.[0]}</b></div><div className="top-actions"><div className="search"><Search size={16} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar no projeto..." aria-label="Buscar no projeto" /></div><button className="icon-button" onClick={printPage} aria-label="Imprimir projeto"><Printer size={17} /></button><button className="export-button" onClick={() => download('relatorio-clinica-vida.txt', 'Clínica Vida+ — Relatório acadêmico\nProgresso: 68%\n\nProjeto concluído com dados demonstrativos.') }><Download size={16} /> Exportar</button></div></header>
      <div className="content">
        {active === 'overview' && <><section className="hero"><div><div className="eyebrow"><HeartPulse size={15} /> SISTEMA DE GESTÃO DE CONSULTAS</div><h1>Clínica Vida<span>+</span></h1><p>Uma jornada prática para transformar requisitos em uma solução organizada, funcional e pronta para apresentação.</p><div className="hero-actions"><button className="primary" onClick={() => setActive('sprint')}>Explorar projeto <ArrowRight size={16} /></button><button className="secondary" onClick={printPage}><Printer size={16} /> Imprimir capa</button></div></div><div className="hero-card"><div className="orb"><HeartPulse size={30} /></div><span>ENTREGA FINAL</span><strong>5 etapas</strong><small>100% documentadas</small></div></section><section className="intro-grid"><div className="intro-card"><div className="card-icon mint"><BookOpen size={18} /></div><div><h3>Sobre o projeto</h3><p>Aplicação acadêmica construída para praticar gestão ágil, programação, lógica, algoritmos e modelagem UML.</p></div></div><div className="intro-card"><div className="card-icon peach"><CircleHelp size={18} /></div><div><h3>Como navegar</h3><p>Use o menu lateral para visitar cada passo. Todos os dados são fictícios e servem apenas para demonstração.</p></div></div></section><div className="stats"><div><span>Entregas</span><strong>05</strong><small>etapas da atividade</small></div><div><span>Sprints</span><strong>03</strong><small>ciclos planejados</small></div><div><span>Concluído</span><strong>68%</strong><small>do projeto geral</small></div><div><span>Versão</span><strong>1.0</strong><small>entrega acadêmica</small></div></div><section className="section-card"><SectionTitle eyebrow="INTRODUÇÃO" title="Objetivos da atividade" description="A solução conecta fundamentos de desenvolvimento em uma experiência única e navegável." icon={TargetIcon} /><div className="objective-list"><div><b>01</b><span>Organizar o trabalho em sprints com acompanhamento visual de tarefas.</span></div><div><b>02</b><span>Aplicar Python, lógica proposicional e estruturas de dados.</span></div><div><b>03</b><span>Documentar o sistema com um diagrama de casos de uso completo.</span></div></div></section></>}
        {active === 'sprint' && <section><SectionTitle eyebrow="PASSO 1 · PLANEJAMENTO" title="Quadro de sprints" description="Acompanhe o fluxo de trabalho da equipe. Mova uma tarefa para registrar sua evolução." icon={ClipboardList} /><div className="sprint-meta"><div><span>Sprint atual</span><strong>Construção e validação</strong></div><div><span>Período</span><strong>04 — 18 nov 2026</strong></div><div><span>Objetivo</span><strong>Finalizar documentação</strong></div><button className="secondary" onClick={() => download('relatorio-sprint.txt', 'RELATÓRIO DA SPRINT\n\nResultados: documentação dos cinco passos.\nDesafios: validar combinações lógicas.\nPontos positivos: integração entre áreas.\nMelhorias: revisar acessibilidade.') }><FileText size={16} /> Relatório</button></div><div className="kanban">{Object.entries(columns).map(([name, tasks]) => <div className="kanban-column" key={name}><div className="column-heading"><span className={`status-dot ${name.replaceAll(' ', '-').toLowerCase()}`} /> <strong>{name}</strong><span className="count">{tasks.length}</span></div>{filtered(tasks).map(task => <article className="task-card" key={task.id}><div className="task-top"><span className="tag">{task.tag}</span><button aria-label="Opções da tarefa"><ChevronDown size={15} /></button></div><h4>{task.title}</h4><div className="task-bottom"><span>{task.checked ? <Check size={14} /> : <span className="empty-check" />} checklist</span><span>{task.comments} comentários</span></div><select value={name} onChange={e => moveTask(task.id, name, e.target.value)} aria-label={`Mover ${task.title}`}><option>Backlog</option><option>Sprint Atual</option><option>Em Progresso</option><option>Concluído</option></select></article>)}</div>)}</div><p className="note">Quadro demonstrativo inspirado em ferramentas ágeis. Para criar no Trello real, use as mesmas listas e cartões ou consulte a documentação de integração.</p></section>}
        {active === 'python' && <section><SectionTitle eyebrow="PASSO 2 · PROGRAMAÇÃO" title="Cadastro de pacientes" description="O arquivo executável usa listas e dicionários para organizar os dados da Clínica Vida+." icon={CodeIcon} /><div className="code-layout"><div className="code-panel"><div className="code-header"><span><i /> <i /> <i /></span><small>clinica_vida.py</small><button onClick={() => download('clinica_vida.py', pythonCode, 'text/x-python')}><Download size={15} /> Baixar código</button></div><pre>{pythonCode}</pre></div><div className="stats-panel"><h3>Estatísticas demonstrativas</h3><div className="patient-stat"><Users size={18} /><span>Total cadastrado</span><strong>04</strong></div><div className="patient-stat"><BarChart3 size={18} /><span>Idade média</span><strong>34,5 <small>anos</small></strong></div><div className="patient-stat"><span className="stat-dot blue" /><span>Paciente mais novo</span><strong>22 <small>anos</small></strong></div><div className="patient-stat"><span className="stat-dot orange" /><span>Paciente mais velho</span><strong>58 <small>anos</small></strong></div><a className="download-link" href="/clinica_vida.py" download>Baixar arquivo executável <ArrowRight size={15} /></a></div></div></section>}
        {active === 'logic' && <section><SectionTitle eyebrow="PASSO 3 · LÓGICA PROPOSICIONAL" title="Regras de atendimento" description="Veja as expressões e todas as 16 combinações possíveis para cada modalidade." icon={GitBranch} /><div className="formula-grid"><div className="formula-card"><span>CONSULTA NORMAL</span><code>(A ∧ B ∧ C) ∨ (B ∧ C ∧ D)</code><p>A agenda, B documentos válidos, C médico disponível e D pagamentos em dia.</p></div><div className="formula-card emergency"><span>EMERGÊNCIA</span><code>C ∧ (B ∨ D)</code><p>O médico disponível é indispensável; documentos ou pagamentos liberam o atendimento.</p></div></div><div className="logic-table"><h3>Tabela-verdade · Consulta normal</h3><TruthTable /></div><div className="logic-table"><h3>Tabela-verdade · Emergência</h3><TruthTable emergency /></div><div className="analysis"><strong>Análise do caso A=F, B=V, C=V, D=F</strong><p><b>Consulta normal:</b> F, pois não há agendamento e os pagamentos não estão em dia. <b>Emergência:</b> V, pois há médico disponível e documentos válidos.</p></div></section>}
        {active === 'fifo' && <section><SectionTitle eyebrow="PASSO 4 · ALGORITMO" title="Fila de atendimento FIFO" description="Primeiro a entrar, primeiro a sair: a ordem de atendimento preserva a chegada dos pacientes." icon={GitBranch} /><div className="fifo-card"><div className="fifo-head"><div><span className="eyebrow">PSEUDOCÓDIGO</span><h3>Inserção e remoção na fila</h3></div><span className="fifo-badge">FIFO</span></div><pre>{`INÍCIO\n  fila ← []\n\n  INSIRA fila ← (Ana, 123.456.789-00)\n  INSIRA fila ← (Bruno, 987.654.321-00)\n  INSIRA fila ← (Carla, 456.789.123-00)\n\n  paciente ← REMOVA_PRIMEIRO(fila)\n  ESCREVA paciente\n  ESCREVA fila\nFIM`}</pre><div className="queue-visual"><div className="queue-label">Entrada <ArrowRight size={15} /></div>{['Ana · ***.***.789-00','Bruno · ***.***.321-00','Carla · ***.***.123-00'].map((p, i) => <div className={i === 0 ? 'queue-item served' : 'queue-item'} key={p}><span>{i + 1}</span>{p}{i === 0 && <b>atendido</b>}</div>)}<div className="queue-label"><ArrowRight size={15} /> Saída</div></div><p className="note">O primeiro paciente inserido, Ana, é removido para atendimento. Bruno e Carla permanecem na fila, nessa ordem.</p></div></section>}
        {active === 'uml' && <section><SectionTitle eyebrow="PASSO 5 · MODELAGEM UML" title="Casos de uso" description="Diagrama visual do sistema de gestão de consultas e suas responsabilidades." icon={GitBranch} /><div className="uml-card"><div className="actor-column"><div className="actor"><div className="person">♙</div><strong>Secretária</strong></div></div><div className="system-boundary"><h3>Sistema de gestão de consultas</h3><div className="use-cases">{['Cadastrar paciente','Agendar consulta','Verificar cadastro do paciente','Confirmar consulta','Cancelar consulta','Gerar receita','Imprimir receita'].map((item, i) => <div className={`use-case ${i === 2 ? 'included' : ''}`} key={item}>{item}{[1,3,5].includes(i) && <span className="include">&lt;&lt;include&gt;&gt;</span>}</div>)}</div><div className="relation-notes"><span>Agendar consulta <b>→</b> Verificar cadastro</span><span>Confirmar consulta <b>→</b> Verificar cadastro</span><span>Gerar receita <b>→</b> Imprimir receita</span></div></div><div className="actor-column"><div className="actor"><div className="person">♙</div><strong>Médico</strong></div></div></div><div className="uml-legend"><span><i className="line secretary" /> Secretária: cadastra, agenda, confirma e cancela</span><span><i className="line doctor" /> Médico: cancela consultas e gera receitas</span></div><div className="conclusion"><Sparkles size={18} /><div><strong>Conclusão</strong><p>A Clínica Vida+ integra planejamento ágil, programação e modelagem em uma entrega coerente, funcional e pronta para apresentação.</p></div></div></section>}
      </div><footer><span>Clínica Vida+ · Projeto acadêmico 2026</span><span>Construído com Next.js · TypeScript · Python · UML</span></footer>
    </main></div>
}

function TargetIcon(props: any) { return <Sparkles {...props} /> }
function CodeIcon(props: any) { return <span {...props} style={{ fontFamily: 'monospace', fontWeight: 800 }}>{'</>'}</span> }
const pythonCode = `pacientes = []

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
    except ValueError: print("Digite uma idade válida.")`
