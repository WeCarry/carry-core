<pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>markdown</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-markdown"># Your Package Name

This package provides a utility function for converting JavaScript objects to JSON strings (`toJson`) and a custom error handler class (`ErrorHandler`).

## Installation

```bash
npm install carry-core
</code></div></div></pre>

## Usage

### toJson function

The `toJson` function converts JavaScript objects to JSON strings while handling various corner cases and errors effectively.

<pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>typescript</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-typescript">import { toJson } from "your-package-name";

const obj = { key: "value" };
const jsonString = toJson(obj);

console.log(jsonString); // Output: '{"key":"value"}'
</code></div></div></pre>

The function handles special cases like `Set`, `Map`, `Date`, and `RegExp` instances, as well as circular references.

### ErrorHandler class

The `ErrorHandler` class extends the native JavaScript `Error` class and provides additional functionality, such as automatically logging errors to the console.

<pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>typescript</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-typescript">import { ErrorHandler } from "your-package-name";

try {
  throw new ErrorHandler("An error occurred");
} catch (error) {
  // Handle the error
}
</code></div></div></pre>

#### Constructor

The `ErrorHandler` class constructor accepts the following parameters:

- `message` (string): The error message.
- `stackTrace` (optional string): The stack trace of the error. If not provided, a new stack trace will be generated.

#### Properties

- `name` (string): The error name, which defaults to the class name (e.g., `ErrorHandler`).
- `message` (string): The error message.
- `stackTrace` (string): The error's stack trace.

## License

Your chosen license (e.g., MIT, GPL, etc.)-name` with the actual name of your package and update the installation instructions if necessary. You should also choose an appropriate license for your package and replace the placeholder in the "License" section.
