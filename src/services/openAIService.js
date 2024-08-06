const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;


export const generateReadme = async (repoDetails) => {
  const response = await fetch('https://chatapi.akash.network/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama3-8b',
      messages: [
        {
          role: 'user',
          content: `

       Generate a detailed and professional README for the following GitHub repository:

          Repository Name: ${repoDetails.name}
          Description: ${repoDetails.description}
          Author: ${repoDetails.owner.login}
          URL: ${repoDetails.html_url}
          Primary Language: ${repoDetails.language}


                  ## Sections
                  Include the following sections in the README:

                  1. **Introduction**: Write a concise and accurate introduction about the project. Ensure you understand the project's purpose and functionality by analyzing the provided repository details, README files, documentation, and running the project if necessary. If information is not available, prompt the user to input details.
                    
                    **Example**:
                    
                    ## Introduction
                    [Provide a brief overview of the project, its purpose, and main functionality.]
                    

                  2. **Features**: List the key features of the project. Extract this information from the project documentation, feature lists, or source code comments. If features are not clearly listed, prompt the user to provide them.
                    
                    **Example**:
                    
                    ## Features
                    - [Feature 1]
                    - [Feature 2]
                    - [Feature 3]
                    

                  3. **Installation**: Provide step-by-step instructions to install the project based on the tech stack. Use the repository's installation guide if available, or deduce from common practices for the given language and frameworks. If instructions are missing, prompt the user to provide them.
                    
                    **Example**:
                    
                    ## Installation
                    1. [Step 1]
                    2. [Step 2]
                    3. [Step 3]
                    

                  4. **Usage**: Explain how to use the project with examples. Use existing documentation or examples from the repository. If usage instructions are missing, prompt the user to provide them.
                    
                    **Example**:
                    
                    ## Usage
                    - [Example 1]
                    - [Example 2]
                    

                  5. **Contributing**: Provide instructions for contributing to the project. Check for a CONTRIBUTING.md file or similar documentation. If not available, prompt the user for guidelines.
                    
                    **Example**:
                    
                    ## Contributing
                    [Provide contribution guidelines, including how to fork the repo, create a branch, make changes, and submit a pull request.]
                    

                  6. **License**: Provide the license information. Use the LICENSE file in the repository or assume MIT if not specified. Confirm with the user if unsure.
                    
                    **Example**:
                   
                    ## License
                    [License details, e.g., MIT License]
                   

                  7. **Contact Information**: Provide information on how to reach the author or maintainers. Use the repository details or prompt the user for contact information.
                    
                    **Example**:
                   
                    ## Contact Information
                    - [Email]
                    - [Twitter]
                    - [LinkedIn]
                   

                  ## Badges
                  Add appropriate badges for the following:
                  - License (use MIT as default if not provided)
                  - GitHub last commit
                  - Issues
                  - Forks
                  - Stars
                  - Language

                  Ensure the README is well-structured, formatted, and easy to read with appropriate headings and bullet points.

                  ---

                  If certain details are unavailable from the repository, please provide the missing information in the specified format.
`
        }
      ],
      max_tokens: 5000,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate README');
  }

  const data = await response.json();
  return data.choices[0].message.content;
};
