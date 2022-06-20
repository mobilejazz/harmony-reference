---
title: QA and Pull Request Live Cycle
---

### QA Presentation
Find below a quick presentation with the definitions of the QA flow, including Pull-Requests & screen-recordings requirements.

[QA Standard Process](https://drive.google.com/file/d/1RHOdxHG547rkpgog2VoAuj0mbCxM4vRp/view)

### Pull Request Creation
1. Create the Pull Request following the [Git Standardization Guide](git-standardization)

### Pull Request is Ready
1. Upload a **Screenshot or Video** in your Task Manager
2. Add a **description** in the PR if the task is non-self-explanatory
3. (optional) Delete the WIP: mode
4. Add the required **Reviewers** to the PR (in case of doubt ask your PM)
5. **Move** the Task to Code Review section in your Task Manager and ping Reviewers

### Creator/Reviewer Checklist
**Documentation**
1. Is this PR a complex or big feature? --> Add a new `/docs/name-feature-file.md` with an explanation, diagrams, 
screenshots or video.
2. Is this code non-self-explanatory? --> Add a `@link` in the source code to the related Task. Ex. The customer ask for some not usual or complex behavior, add a link to the Asana Card with the explanation and 
  discussion.

**Frontend**
1. Compare InVision Design and the Screenshot/Video/Final Result. Play the "7 differences" game. Make sure there 
   aren't major inconsistencies (margins/paddings/colors/font-weight/size…).
2. Identify "repeating visual patterns" --> Convert to a reusable component. Ex. a `<button>` that is repeating with different color or sizes. In case of doubt ask the designers.
3. Check common BEM code smell --> Refactor. [BEM Presentation](https://docs.google.com/presentation/d/16bNPN7A_JDhKxvLdRf1CKaWB5bYRwys5rmEYRMiLX2A/edit#slide=id.gf260d01fd3_0_67)

**Backend**
1. Security
   1. No hard code or store credentials on Git Repository or Documentation, use a Password Manager
   2. Use secure passwords always
   3. Fully prevent SQL injection by only using SQL prepared statements.
   4. Do client-side input validation for quick user feedback, but never trust it
   5. Ask for a Full Security Checklist to DevOps Team

**Mobile**
ToDo
