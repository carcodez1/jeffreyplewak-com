%%{init:{
  "theme":"base",
  "themeVariables":{
    "primaryColor":"#0f172a",
    "primaryTextColor":"#e2e8f0",
    "lineColor":"#334155"
  }
}}%%

%%{init:{
  "theme":"base",
  "themeVariables":{
    "fontFamily":"Inter, system-ui, sans-serif",
    "primaryColor":"#0f172a",
    "primaryTextColor":"#e2e8f0",
    "primaryBorderColor":"#1e293b",
    "lineColor":"#334155"
  }
}}%%

flowchart TB

%% =========================
%% IDENTITY & ACCESS CONTROL
%% =========================

subgraph "IDENTITY & ACCESS CONTROL"
    A["Authentication / Authorization"]
    B["Role-Based Access Control (RBAC)"]
    C["Access Audit Log"]
    A --> B --> C
end

%% =========================
%% CONTROLLED PROCESSING
%% =========================

subgraph "CONTROLLED PROCESSING ENVIRONMENT (Trust Boundary)"
    D["Client Upload"]
    E["Input Validation Layer"]
    F["OCR Adapter (Non-Authoritative)"]
    G["LLM Adapter (API or Local Model)"]
    H["Inference Configuration Snapshot"]
    I["Structured Extraction Output"]

    D --> E --> F --> G --> I
    G --> H
end

%% =========================
%% EVIDENCE & INTEGRITY
%% =========================

subgraph "EVIDENCE & INTEGRITY CONTROLS"
    J["Extracted Artifact"]
    K["Model Output Artifact"]
    L["SHA-256 Content Hash"]
    M["Manifest Builder (manifest.json)"]

    I --> J
    I --> K
    J --> L
    K --> L
    H --> L
    L --> M
end

%% =========================
%% GOVERNANCE & REVIEW
%% =========================

subgraph "GOVERNANCE & POLICY ENFORCEMENT"
    N["Policy Engine"]
    O{"Human Review Required?"}
    P["Human Review Record"]
    Q["Immutable Audit Log"]

    M --> N
    N --> O
    O -->|Yes| P --> Q
    O -->|No| Q
end

%% =========================
%% VERIFIED OUTPUT & STORAGE
%% =========================

subgraph "VERIFIED OUTPUT & RETENTION"
    R["Evidence Bundle"]
    S["Digital Signature (v2)"]
    T["Trusted Timestamp Authority (v2)"]
    U["Secure Object Storage"]

    Q --> R --> S --> T --> U
end

%% Flow from Access Control
B --> D

%% =========================
%% STYLING
%% =========================

classDef identity fill:#1e3a8a,stroke:#3b82f6,color:#ffffff,stroke-width:2px;
classDef processing fill:#0f766e,stroke:#14b8a6,color:#ffffff,stroke-width:2px;
classDef integrity fill:#78350f,stroke:#f59e0b,color:#ffffff,stroke-width:2px;
classDef governance fill:#4c1d95,stroke:#a855f7,color:#ffffff,stroke-width:2px;
classDef storage fill:#334155,stroke:#64748b,color:#ffffff,stroke-width:2px;

class A,B,C identity;
class D,E,F,G,H,I processing;
class J,K,L,M integrity;
class N,O,P,Q governance;
class R,S,T,U storage;


note right of U
KProveEngine v1.0
© Jeffrey Plewak
end
