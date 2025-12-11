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



# MonorepoTest

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/getting-started/tutorials/react-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Finish your remote caching setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/dURAIzI9ii)


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

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/react:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/react:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)




