//USER

interface User {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
    role: 'admin' | 'member' | 'viewer';
    createdAt: Date
}

// PROJECT

interface Project {
    id: string;
    key: string; // e.g., "PROJ" for issue keys like PROJ-123
    name: string;
    description?: string;
    ownerId: string;
    members: ProjectMember[];
    createdAt: Date
    deletedAt: Date
}


// PROJECT MEMBER

interface ProjectMember {
    userId: string;
    role: 'owner' | 'admin' | 'member'
    joinedAt: Date
}

//ISSUE CORE ENTRY

interface Issue {
  id: string;
  key: string; // PROJ-123
  projectId: string;
  title: string;
  description?: string; // Rich text/markdown
  type: 'task' | 'bug' | 'story' | 'epic';
  status: string; // references workflow status
  priority: 'lowest' | 'low' | 'medium' | 'high' | 'highest';
  
  // Relationships
  reporterId: string;
  assigneeId?: string;
  parentIssueId?: string; // for subtasks
  epicId?: string;
  
  // Sprint/backlog
  sprintId?: string;
  storyPoints?: number;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

// WORKFLOW/STATUS
interface Workflow {
  id: string;
  projectId: string;
  name: string;
  statuses: WorkflowStatus[];
}

interface WorkflowStatus {
  id: string;
  name: string; // "To Do", "In Progress", "Done"
  category: 'todo' | 'inprogress' | 'done';
  order: number;
  color?: string;
}

// SPRINT

interface Sprint {
  id: string;
  projectId: string;
  name: string;
  goal?: string;
  startDate: Date;
  endDate: Date;
  status: 'future' | 'active' | 'completed';
  createdAt: Date;
}

//COMMENT

interface Comment {
  id: string;
  issueId: string;
  authorId: string;
  content: string; // Markdown
  createdAt: Date;
  updatedAt: Date;
}


