# Recipe Finder Application

A modern web application built with Vue.js and AWS Amplify that helps users discover and save recipes in multiple languages.

## Features

- **Recipe Search**: Search for recipes by ingredients
- **Multilingual Support**: 
  - Interface in English, Russian, and Ukrainian
  - Recipe translation using DeepL API
- **Save & Manage**: Save favorite recipes and manage them in your personal collection
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **AWS Integration**: Powered by AWS Amplify for robust backend functionality

## Tech Stack

- **Frontend**: Vue.js 3 with TypeScript
- **State Management**: Vue Composition API
- **Styling**: Tailwind CSS
- **Backend**: AWS Amplify
- **Database**: Amazon DynamoDB
- **Authentication**: Amazon Cognito
- **API**: AWS AppSync (GraphQL)
- **Translation**: DeepL API
- **Recipe Data**: Spoonacular API

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with:
```
VITE_SPOONACULAR_API_KEY=your_spoonacular_api_key
VITE_DEEPL_API_KEY=your_deepl_api_key
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/        # Reusable Vue components
├── views/            # Page components
├── models/           # Data models for AWS Amplify
├── utils/           # Utility functions
├── i18n/            # Internationalization files
└── assets/          # Static assets
```

## Features in Detail

### Recipe Search
- Search recipes by ingredients
- View recipe details including ingredients and instructions
- Translate recipes to preferred language

### Saved Recipes
- Save favorite recipes
- View saved recipes offline
- Delete unwanted recipes
- Organize recipes by language

### Multilingual Support
- Interface available in:
  - English
  - Russian
  - Ukrainian
- Recipe translation to multiple languages

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- AWS Amplify team for the excellent backend framework
- Vue.js team for the fantastic frontend framework
- Spoonacular for the recipe API
- DeepL for the translation API
