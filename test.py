from typing import TypedDict, Annotated, Sequence
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from langchain_core.messages import BaseMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai import ChatOpenAI
import operator
from dataclasses import dataclass
from enum import Enum

# State Definition
class TaskPriority(Enum):
    CRITICAL = "🔴 CRITICAL"
    HIGH_ROI = "🟡 HIGH ROI" 
    MEDIUM = "🟢 MEDIUM"
    LOW = "🔵 LOW"

@dataclass
class Task:
    id: str
    title: str
    description: str
    priority: TaskPriority
    est_time_minutes: int
    prerequisites: list[str] = None
    dependencies: list[str] = None
    files: list[str] = None

class SEOState(TypedDict):
    raw_metadata: dict
    audit_results: dict
    action_insights: list[Task]
    task_graph: dict
    execution_plan: list[str]
    messages: Annotated[Sequence[BaseMessage], add_messages]
    current_step: str

# 1. SEO Analysis Node
def analyze_portfolio_seo(state: SEOState) -> SEOState:
    """Analyze metadata against 2026 software engineer portfolio best practices"""
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a 2026 SEO expert for software engineer portfolios. 
        Analyze this metadata and return structured audit results targeting:
        - "software engineer portfolio 2026"
        - "senior platform engineer remote" 
        - "AI engineer portfolio"
        - "Next.js SEO portfolio"
        
        CRITICAL: Title, meta desc, schema, canonical, Core Web Vitals
        HIGH ROI: Keywords, internal links, OG/Twitter completeness
        MEDIUM: Image alts, Hn structure, content signals
        LOW: Minor tweaks"""),
        ("user", """Metadata: {raw_metadata}\nAnalyze completely."""),
        MessagesPlaceholder(variable_name="messages")
    ])
    
    chain = prompt | ChatOpenAI(model="gpt-4o", temperature=0)
    result = chain.invoke({
        "raw_metadata": state["raw_metadata"],
        "messages": state["messages"]
    })
    
    state["audit_results"] = {
        "overall_score": 78,
        "critical_issues": 3,
        "high_roi": 5,
        "keyword_opportunities": ["software engineer portfolio", "platform engineer remote"]
    }
    state["messages"] += [result]
    return state

# 2. Action Insights Node (Generates Tasks)
def generate_action_tasks(state: SEOState) -> SEOState:
    """Convert audit → prioritized, interdependent tasks"""
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", """Generate 8-12 SEO tasks as executable steps with:
        - id: unique (seo-title, seo-schema, etc)
        - title: 1-line action  
        - description: what + why + expected impact
        - priority: CRITICAL/HIGH_ROI/MEDIUM/LOW
        - est_time_minutes: 5-45
        - prerequisites: [] (task ids this depends on)
        - files: ["app/page.tsx", "app/layout.tsx"] (files to edit)
        
        Example task structure:
        ```json
        {{"id": "seo-title", "title": "Optimize title tag", "priority": "CRITICAL", 
          "prerequisites": [], "est_time_minutes": 5, "files": ["app/page.tsx"]}}
        ```"""),
        ("user", """Audit: {audit_results}\nGenerate complete task list.""")
    ])
    
    chain = prompt | ChatOpenAI(model="gpt-4o", temperature=0) 
    result = chain.invoke({"audit_results": state["audit_results"]})
    
    # Parse tasks (simplified - use Pydantic in prod)
    tasks = [
        Task(id="seo-title", title="Optimize title tag", priority=TaskPriority.CRITICAL, 
             est_time_minutes=5, files=["app/page.tsx"], prerequisites=[]),
        Task(id="seo-schema", title="Add WebPage schema", priority=TaskPriority.CRITICAL, 
             est_time_minutes=10, files=["app/page.tsx"], prerequisites=["seo-title"]),
        Task(id="seo-sitemap", title="Create sitemap.xml", priority=TaskPriority.HIGH_ROI, 
             est_time_minutes=15, files=["app/sitemap.ts"], prerequisites=[]),
        # ... more tasks
    ]
    
    state["action_insights"] = tasks
    return state

# 3. Task Dependency Graph Node
def build_task_graph(state: SEOState) -> SEOState:
    """Build topological sort + dependency tree"""
    
    tasks = state["action_insights"]
    graph = {}
    ready_tasks = []
    
    # Build adjacency list
    for task in tasks:
        graph[task.id] = {
            "task": task,
            "prereqs": task.prerequisites,
            "dependents": []
        }
    
    # Link dependencies
    for task_id, node in graph.items():
        for prereq in node["task"].prerequisites:
            if prereq in graph:
                graph[prereq]["dependents"].append(task_id)
    
    # Find ready tasks (no prereqs)
    for task_id, node in graph.items():
        if not node["task"].prerequisites:
            ready_tasks.append(task_id)
    
    state["task_graph"] = graph
    state["execution_plan"] = ready_tasks
    state["current_step"] = ready_tasks[0] if ready_tasks else None
    
    return state

# 4. Stepper Executor Node
def execute_step(state: SEOState) -> SEOState:
    """Execute current task, update graph, return next ready task"""
    
    current = state["current_step"]
    if not current:
        return state
    
    graph = state["task_graph"]
    task = graph[current]["task"]
    
    print(f"✅ EXECUTING: {task.title} ({task.est_time_minutes}min)")
    
    # Simulate execution (replace with real file writes)
    print(f"📝 Updated files: {', '.join(task.files)}")
    
    # Mark complete, unlock dependents
    graph[current]["task"].priority = TaskPriority.LOW  # Done
    for dependent in graph[current]["dependents"]:
        graph[dependent]["task"].prerequisites.remove(current)
        if not graph[dependent]["task"].prerequisites:
            state["execution_plan"].append(dependent)
    
    # Remove from execution plan
    if current in state["execution_plan"]:
        state["execution_plan"].remove(current)
    
    state["current_step"] = state["execution_plan"][0] if state["execution_plan"] else "COMPLETE"
    return state

# 5. LangGraph Assembly
def create_seo_portfolio_optimizer():
    """Main graph assembly"""
    
    workflow = StateGraph(SEOState)
    
    # Add nodes
    workflow.add_node("analyze_seo", analyze_portfolio_seo)
    workflow.add_node("generate_tasks", generate_action_tasks)
    workflow.add_node("build_graph", build_task_graph)
    workflow.add_node("execute_step", execute_step)
    
    # Edges
    workflow.set_entry_point("analyze_seo")
    workflow.add_edge("analyze_seo", "generate_tasks")
    workflow.add_edge("generate_tasks", "build_graph")
    workflow.add_edge("build_graph", "execute_step")
    
    # Conditional stepping
    def should_continue(state):
        return "execute_step" if state["current_step"] else END
    
    workflow.add_conditional_edges(
        "execute_step",
        should_continue,
        {"execute_step": "execute_step", END: END}
    )
    
    return workflow.compile()

# 6. Usage Example
if __name__ == "__main__":
    # Initialize with your metadata
    initial_state = {
        "raw_metadata": {
            "title": "Jeffrey R. Plewak — Senior Software Engineer",
            "meta_description": "Senior software engineer focused on...",
            # ... your full metadata
        },
        "messages": []
    }
    
    app = create_seo_portfolio_optimizer()
    
    # Run full pipeline
    result = app.invoke(initial_state)
    
    print("🎯 SEO EXECUTION COMPLETE")
    print(f"📊 Final score improvement: +{result['audit_results']['overall_score'] - 78}%")
    print("📋 Remaining tasks:", len([t for t in result['action_insights'] if t.priority != TaskPriority.LOW]))

