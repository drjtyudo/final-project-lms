## How to run Development

Install it and run:

```bash
yarn
yarn dev
```

## How to run Production

Install it and run:

```bash
yarn
yarn build
yarn start
```

## Folder Structure

- src
  - components: This directory contains reusable components that are used across multiple pages.
  - data: Here, you'll find the code responsible for fetching data from the backend using React Query. This directory stores the logic and functions for data retrieval.
  - helpers: The "helpers" directory consists of JavaScript utility functions, including any custom utilities built on top of libraries like lodash.
  - layouts: In this directory, you'll find page layouts and container customizations. It contains components or templates that define the overall structure of a page.
  - pages: The "pages" directory holds the Next.js pages. These files represent the different routes or views of your application. Each page file corresponds to a specific URL.
  - services: This directory contains code related to API integrations, including fetching data, making requests using libraries like Axios or XHR, and handling API-related functionality.
  - styles: Here, you'll find all the styling-related files, such as CSS, SCSS, or LESS. This directory includes style definitions and customizations for components and layouts.
  - types: The "types" directory stores TypeScript data types. It includes type definitions for the various data structures and interfaces used throughout your application.
  - views: The "views" directory contains components that represent the different pages or views displayed to users. These components are used within the "pages" directory and are responsible for rendering the content visible to users.

## Code Styleguide

1. Using useQuery hook for fetching data:

```js
interface User {
  id: number
  name: string
}

type IResponse = User[]

type IParams = {
  page?: number
  pageSize?: number
  options?: UseQueryOptions<IResponse, AxiosError>
}

function useUsers(params: IParams = {}) {
  const { page = 1, pageSize = 10, options } = params
  const queryKey = ['/users', page, pageSize]

  const query = useQuery<IResponse, AxiosError>(
    queryKey,
    () =>
      CallAPI.getDummyUsers({ page, pageSize }).then((res) => {
        return res.data
      }),
    { ...options },
  )

  return {
    ...query,
    data: query.data,
  }
}

export default useUsers
```

2. Using useMutation hook for POST, PUT, DELETE requests:

```js
type IParams = {
  onSuccess?: () => void,
}

function useLoginMutation(params: IParams = {}) {
  const { onSuccess } = params

  const mutation = useMutation(
    (fieldValues: { user: string, password: string }) => {
      return CallAPI.login(fieldValues)
    },
    {
      onSuccess() {
        onSuccess?.()
        // Action after login success here
      },
      onSettled() {
        // Action after login success or error here
      },
    },
  )

  return mutation
}

export default useLoginMutation
```

3. Using object parameter instead of multiple parameters in functions:

```js
// Bad
const fetchData = (param1, param2) => {
  // Fetch data using param1 and param2
}

// Good
const fetchData = ({ param1, param2 }) => {
  // Fetch data using param1 and param2
}
```

4. Code naming conventions:
   It's important to follow consistent naming conventions to make your code more readable. Here are some common conventions:

   - Use camelCase for variable and function names (e.g., myVariable, myFunction).
   - Use PascalCase for component names (e.g., MyComponent).
   - Use uppercase for constants (e.g., API_URL).
   - Choose descriptive names that convey the purpose or functionality of the code.
   - By adhering to these code rules, your code will be more organized, maintainable, and easier to understand.

5. Document your code:
   Consider adding comments or documentation to explain the purpose, functionality, and usage of your code. This helps other developers understand your codebase and enables easier collaboration and maintenance.
