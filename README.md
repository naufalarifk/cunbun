# To-do


## Frontend

-[ ] Shadcn integration

Home
- [ ] Boards List
- [ ] Settings
- [ ] Projects
- [ ] Teams


Core:
- [ ] Name/rename tasks
- [ ] Tasks from api fetched from backend
- [ ] Change Nav into Drawable Sidebar



Auth:
- [ ] Sign-In
- [ ] Sign-Up
- [ ] Forgot Password



# Commands

Dev `bun dev` from root project, idk what to experiment yet




# Plans 

// Projects
POST   /api/projects
GET    /api/projects
GET    /api/projects/:id
PATCH  /api/projects/:id
DELETE /api/projects/:id

// Issues
POST   /api/projects/:projectId/issues
GET    /api/projects/:projectId/issues  // with query params for filters
GET    /api/issues/:id
PATCH  /api/issues/:id
DELETE /api/issues/:id
POST   /api/issues/:id/assign
PATCH  /api/issues/:id/status

// Sprints
POST   /api/projects/:projectId/sprints
GET    /api/projects/:projectId/sprints
PATCH  /api/sprints/:id
POST   /api/sprints/:id/start
POST   /api/sprints/:id/complete
POST   /api/sprints/:id/issues  // add issue to sprint

// Comments
POST   /api/issues/:issueId/comments
GET    /api/issues/:issueId/comments
PATCH  /api/comments/:id
DELETE /api/comments/:id
```


# UI
-[] Use Shadcn


## Nx Library Structure Recommendation
```
libs/
  shared/
    types/              # All interfaces above
    validation/         # Zod schemas for API DTOs
    constants/          # Issue types, priorities, etc.
    
    #FRONTEND ARCH IS YET TO BE DECIDED
  frontend/
    components/        # Button, Input, Modal, etc.
        atoms/
        molecules/
        organisms/
        templates/

    #AS FOR BELOW THESE MIGHT GO TO ORGANISMS OR TEMPLATES FOR BIGGER COMPONENTS
    issue/             # IssueCard, IssueDetail components
    board/             # KanbanBoard, KanbanColumn
    
  backend/
    auth/              # NestJS auth module
    projects/          # Projects module
    issues/            # Issues module  
    sprints/           # Sprints module
    comments/          # Comments module
    database/          # TypeORM/Drizzle setup 



## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve frontend
```

To create a production bundle:

```sh
npx nx build frontend
```

To see all available targets to run for a project, run:

```sh
npx nx show project frontend
```

To generate a new application, use:

```sh
npx nx g @nx/react:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/react:lib mylib
```

