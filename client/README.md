# Ollama Chat Client

A reusable, modular React chat widget for Ollama that can be easily integrated into any React project.

## Features

- 🎯 **Standalone Widget**: Floating chat interface that sits independently on top of your app
- 🔄 **Model Management**: Select and download Ollama models directly from the UI
- 🎨 **Themeable**: Built with Tailwind CSS using semantic design tokens
- 🔗 **Router Integration**: Optional navigation callback to route within your app
- 📦 **Easy Integration**: Simple provider/component pattern for quick setup

## Quick Start

### Prerequisites

Make sure [Ollama](https://ollama.ai) is installed and running:

```bash
ollama serve
```

### Usage in Your React Project

Copy the `src/components/ollama` folder to your React project, then:

```tsx
import { OllamaProvider, OllamaChatWidget } from '@/components/ollama';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <OllamaProvider
      config={{
        baseUrl: 'http://localhost:11434',
        onNavigate: (path) => navigate(path),
      }}
    >
      <YourAppContent />
      <OllamaChatWidget />
    </OllamaProvider>
  );
}
```

---

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/47bb53d3-35ad-4bc7-8145-728b81f13e3a

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/47bb53d3-35ad-4bc7-8145-728b81f13e3a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/47bb53d3-35ad-4bc7-8145-728b81f13e3a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
