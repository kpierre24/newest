# My Vue Mobile App

This is a mobile application built using Vue.js. The app includes features for user authentication, basic information management, and address management.

## 🔧 Configuration

### Environment Variables

The application uses the following environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_BASE_URL | Base URL for API requests | http://localhost:8000 |
| VITE_APP_NAME | Application name | Cathedral Engage |
| VITE_APP_VERSION | Application version | 1.0.0 |
| VITE_ENABLE_DEBUG_LOGGING | Enable debug logging | false |
| VITE_MAX_FILE_SIZE | Maximum file upload size (bytes) | 5242880 |
| VITE_ALLOWED_FILE_TYPES | Allowed file upload types | image/jpeg,image/png,application/pdf |
| VITE_AUTH_TOKEN_EXPIRY | Auth token expiry (seconds) | 3600 |
| VITE_API_TIMEOUT | API request timeout (ms) | 30000 |

## 📱 Features

- User Registration and Login
- Email and Mobile Verification
- ID Document Upload
- Basic Information Collection
- Address Management
- Employment Information
- PEP Declaration
- Beneficiary Management
- Guardian Information (for minors)
- Bank Account Information
- Branch Selection

## 🏗️ Project Structure

```
my-vue-mobile-app
├── public
│   ├── index.html          # Main HTML file
├── src
│   ├── assets              # Static assets (images, fonts, styles)
│   ├── components          # Vue components
│   │   ├── Login.vue       # Login component
│   │   ├── Signup.vue      # Signup component
│   │   ├── BasicInfo.vue   # Basic information component
│   │   ├── Address.vue      # Address management component
│   ├── router              # Vue Router configuration
│   │   └── index.js        # Routes definition
│   ├── views               # View components
│   │   ├── Home.vue        # Home view component
│   ├── App.vue             # Root component
│   ├── main.js             # Entry point of the application
├── package.json            # npm configuration
├── babel.config.js         # Babel configuration
├── vue.config.js           # Vue CLI configuration
└── README.md               # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd my-vue-mobile-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the application:
   ```
   npm run serve
   ```

5. Open your browser and go to `http://localhost:8080` to see the app in action.

## Features

- User login and signup functionality
- Basic information management
- Address management
- Responsive design for mobile devices

## Contributing

Feel free to submit issues or pull requests for any improvements or features you would like to see!

## Deployment

2. Deploy the `dist` directory to your hosting service.

3. Ensure environment variables are set in your production environment.

## 🔒 Security

- All sensitive data is transmitted over HTTPS
- File uploads are validated for type and size
- Authentication tokens are stored securely
- Input validation is performed on all forms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the [Your License] License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work - [Your GitHub]

## 🙏 Acknowledgments

- Cathedral Credit Union team
- Vue.js community
- Vuetify team

## 🛠️ Development

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code
- `npm run test` - Run tests

### Code Style

This project follows the Vue.js Style Guide and uses:
- ESLint for code linting
- Prettier for code formatting
- Vue Router for routing
- Pinia for state management
- Vuetify for UI components