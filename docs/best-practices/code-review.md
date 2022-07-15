---
title: Code Review
---

It is obvious that code review is something good that should be enforced in all projects, tasks, and any kind of company efforts. However, sometimes budget limitations, time constraints, or just pragmacity limits our capacity of doing it. Without proper control, it's very easy to stop doing proper code review in specific tasks or efforts where it is very important to ensure the right quality.

:::important Important
Your **code must be always being reviewed** via pull-requests revisions, unless a specific exception is applied.
:::

### Code Review Strategy

Given a team of engineers working in a project, when new PR are created the following schema must be follwed when doing code reviews:

1. The PR is created. The whole team with the exception of the engineering lead will be assigned for revision.
2. The team will proceed to review the code. Many change requests and iterations can happen on this process.
3. Only when the PR is approved by the team, it can go to the next point:
4. The PR is then assigend for revision to the engineering lead, who will perform a final check to ensure everything is ok.
5. If the lead engineer approves, then the PR can be merged. Otherwise, the process goes down the step 1.

There are two reasons that justifies this approach: 

- First, to let the team work on its own and collaborate in the code review phase. 
- Second, to remove noise from the engineering lead, and request his attention once the team gives the green light to the PR.

### When is ok to not do code review?

There are few exceptions where Mobile Jazz can assume to not do code review:

1. **The project budget is too small**: Sometimes, there are projects that require a very small dedication from our team. 
2. **The responsible engineer is an authority (Senior/Staff/Principal)**:  In this scenario, Mobile Jazz can delegate the repsonsibility of the code quality to the leading engineer.

:::warning Important
It is the **Project Manager (PM)** who will determine if a project requires or not Code Reviews, not engineers/developers.
:::

