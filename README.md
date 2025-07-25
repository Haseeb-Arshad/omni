# 🤖 OmniAgent - Omni-Channel AI Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)
[![Remix](https://img.shields.io/badge/Remix-000000?style=flat&logo=remix&logoColor=white)](https://remix.run/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **Transform your customer communications with intelligent AI agents across all channels**

OmniAgent is a comprehensive omni-channel AI platform that enables businesses to manage customer communications seamlessly across multiple platforms including WhatsApp, Telegram, Discord, Slack, and more. Built with cutting-edge AI technology, OmniAgent provides intelligent conversation automation, real-time analytics, and enterprise-grade security.

## 🌟 Key Features

### 🔗 Multi-Channel Integration
- **Universal Connectivity**: Connect WhatsApp Business, Telegram, Discord, Slack, Facebook Messenger, Instagram DM, and more
- **Unified Interface**: Manage all conversations from a single, intuitive dashboard
- **Channel-Specific Optimization**: Tailored AI responses based on platform characteristics
- **Real-time Synchronization**: Instant message routing and status updates across all channels

### 🤖 Intelligent AI Agents
- **Custom Personalities**: Create AI agents with unique personalities and response styles
- **Knowledge Base Integration**: Train agents with company-specific information and FAQs
- **Context-Aware Responses**: Maintain conversation context across multiple interactions
- **Multi-language Support**: Communicate with customers in their preferred language
- **Smart Escalation**: Seamless handoff to human agents when needed

### ⚡ Real-time Automation
- **Instant Response**: Sub-second response times for improved customer satisfaction
- **Workflow Automation**: Custom triggers and automated response flows
- **Smart Routing**: Intelligent conversation routing based on content and priority
- **24/7 Availability**: Round-the-clock customer support without human intervention

### 🔐 Enterprise Security
- **End-to-End Encryption**: Bank-grade security for all communications
- **GDPR Compliance**: Full compliance with data protection regulations
- **Role-based Access Control**: Granular permissions for team members
- **Audit Logging**: Complete audit trail for all activities and conversations

### 📊 Advanced Analytics
- **Real-time Metrics**: Live dashboards with key performance indicators
- **Conversation Analytics**: Detailed insights into customer interactions
- **Agent Performance**: Track AI agent effectiveness and success rates
- **Custom Reports**: Generate detailed reports for stakeholders

### 👥 Team Collaboration
- **Seamless Handoffs**: Smooth transition between AI agents and human operators
- **Team Management**: Organize team members with different roles and permissions
- **Collaborative Tools**: Share conversations, notes, and insights across the team
- **Notification System**: Real-time alerts for important conversations and escalations

## 🏗️ Technical Architecture

### Frontend Stack
- **[Remix](https://remix.run/)**: Full-stack web framework for optimal performance
- **[React 18](https://reactjs.org/)**: Modern UI with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)**: Smooth animations and micro-interactions
- **[Radix UI](https://www.radix-ui.com/)**: Accessible component primitives
- **[Lucide React](https://lucide.dev/)**: Beautiful, customizable icons

### Styling System
- **Custom Design Tokens**: Consistent design language with CSS custom properties
- **Glassmorphism Effects**: Modern glass-like UI components with backdrop blur
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark/Light Theme**: Automatic theme switching with system preference detection
- **Advanced Animations**: Sophisticated micro-interactions and page transitions

### Backend Integration
- **Session Management**: Secure cookie-based authentication
- **API Integration**: RESTful API communication with backend services
- **Real-time Updates**: WebSocket connections for live data
- **Error Handling**: Comprehensive error boundaries and fallbacks

## 📁 Project Structure

```
omni/
├── app/
│   ├── components/                 # React components
│   │   ├── dashboard/             # Dashboard-specific components
│   │   │   ├── index.ts           # Component exports
│   │   │   ├── page-header.tsx    # Page header component
│   │   │   ├── stat-card.tsx      # Statistics card component
│   │   │   └── notification-banner.tsx # Notification banner
│   │   ├── dashboard-layout.tsx   # Main dashboard layout
│   │   ├── route-guard.tsx        # Authentication guard
│   │   └── test-styling-system.tsx # Styling system test
│   ├── lib/                       # Utility libraries
│   │   ├── auth.ts               # Authentication utilities
│   │   ├── auth-context.tsx      # Auth context provider
│   │   ├── auth-middleware.ts    # Auth middleware
│   │   ├── design-tokens.ts      # Design system tokens
│   │   ├── monitoring.ts         # Error monitoring
│   │   └── utils.ts              # Common utilities
│   ├── routes/                    # Application routes
│   │   ├── _index.tsx            # Landing page
│   │   ├── auth/                 # Authentication routes
│   │   │   ├── login.tsx         # Login page
│   │   │   ├── register.tsx      # Registration page
│   │   │   └── logout.tsx        # Logout handler
│   │   └── dashboard/            # Dashboard routes
│   │       ├── _index.tsx        # Dashboard overview
│   │       ├── conversations.tsx # Conversations management
│   │       ├── agents.tsx        # AI agents management
│   │       ├── channels.tsx      # Channel integrations
│   │       ├── analytics.tsx     # Analytics dashboard
│   │       ├── personas.tsx      # Agent personalities
│   │       ├── knowledge.tsx     # Knowledge base
│   │       ├── voice.tsx         # Voice interface
│   │       ├── integrations.tsx  # Third-party integrations
│   │       ├── notifications.tsx # Notifications center
│   │       ├── members.tsx       # Team management
│   │       ├── settings.tsx      # Application settings
│   │       ├── profile.tsx       # User profile
│   │       └── help.tsx          # Help center
│   ├── tailwind.css              # Main stylesheet with design system
│   ├── root.tsx                  # Application root
│   ├── entry.client.tsx          # Client entry point
│   └── entry.server.tsx          # Server entry point
├── public/                        # Static assets
│   ├── favicon.ico               # App favicon
│   ├── logo-light.png           # Light theme logo
│   └── logo-dark.png            # Dark theme logo
├── .env.example                  # Environment variables template
├── tailwind.config.ts           # Tailwind configuration
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
├── STYLING_SYSTEM.md            # Styling system documentation
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20.0.0
- **npm** or **yarn** package manager
- Modern web browser with ES2022 support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/omni-agent.git
   cd omni-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   SESSION_SECRET=your-super-secret-session-key-here
   API_BASE_URL=http://localhost:3001/api
   NODE_ENV=development
   GA_MEASUREMENT_ID=your-google-analytics-id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run TypeScript type checking
npm run typecheck

# Run ESLint
npm run lint
```

## 🎨 Design System

OmniAgent features a comprehensive design system built on modern CSS custom properties and Tailwind CSS. The system includes:

### Color Palette
- **Charcoal Scale**: 11-shade charcoal color system (50-950)
- **Accent Colors**: Blue, green, orange, red, and purple variants
- **Semantic Colors**: Success, warning, error, and info states
- **Theme Support**: Automatic light/dark mode with smooth transitions

### Typography
- **Font Scale**: 8-level typography hierarchy (xs to 4xl)
- **Font Families**: Inter for UI text, JetBrains Mono for code
- **Line Heights**: Optimized for readability at each scale

### Glassmorphism Effects
- **Glass Components**: `.glass`, `.glass-card`, `.glass-button` utilities
- **Backdrop Filters**: Modern blur effects with fallbacks
- **Enhanced Variants**: Multiple glass styles for different contexts

### Animation System
- **Custom Keyframes**: Fade, slide, scale, bounce, and shimmer animations
- **Timing Functions**: Spring, bounce, and easing curve presets
- **Performance**: Optimized with `will-change` and reduced motion support

For detailed styling documentation, see [STYLING_SYSTEM.md](STYLING_SYSTEM.md).

## 🔐 Authentication & Security

### Authentication Features
- **Session-based Authentication**: Secure cookie-based sessions
- **Token Management**: JWT tokens with automatic refresh
- **Role-based Access Control**: Admin, user, and viewer roles
- **Route Protection**: Automatic redirection for unauthenticated users

### Security Measures
- **CSRF Protection**: Built-in CSRF token validation
- **XSS Prevention**: Automatic HTML sanitization
- **Secure Headers**: Comprehensive security headers
- **Input Validation**: Server-side validation for all inputs

## 📊 Dashboard Features

### Overview Dashboard
- **Real-time Statistics**: Live metrics and KPIs
- **Performance Indicators**: Response time, resolution rate, satisfaction scores
- **Activity Feed**: Recent conversations and system events
- **Quick Actions**: Fast access to common tasks

### Conversations Management
- **Multi-channel View**: Unified conversation interface
- **Smart Filtering**: Filter by channel, status, agent, and more
- **Real-time Updates**: Live conversation updates
- **Bulk Actions**: Handle multiple conversations simultaneously

### AI Agents Management
- **Agent Creation**: Easy-to-use agent builder
- **Performance Tracking**: Individual agent metrics and analytics
- **A/B Testing**: Compare different agent configurations
- **Template Library**: Pre-built agent templates for common use cases

### Channel Integration
- **Connection Management**: Easy channel setup and configuration
- **Status Monitoring**: Real-time connection health checks
- **Webhook Management**: Automatic webhook configuration
- **Rate Limit Handling**: Smart rate limiting and queue management

### Analytics & Reporting
- **Interactive Dashboards**: Customizable analytics views
- **Export Functionality**: CSV, PDF, and Excel report exports
- **Custom Metrics**: Create custom KPIs and tracking metrics
- **Historical Data**: Long-term trend analysis and insights

## 🧪 Testing

The project includes comprehensive testing utilities:

### Component Testing
- **Styling Validation**: Automatic design token validation
- **Visual Testing**: Component visual regression testing
- **Accessibility Testing**: ARIA compliance and keyboard navigation

### Integration Testing
- **API Integration**: Mock API responses for development
- **Authentication Flow**: Complete auth flow testing
- **Route Testing**: Navigation and route protection testing

## 🚀 Deployment

### Production Build

1. **Create production build**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

### Deployment Options

#### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

#### Netlify
```bash
npm run build
# Deploy dist/ folder
```

#### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Self-hosted
The built-in Remix app server is production-ready. Deploy the contents of:
- `build/server`
- `build/client`
- `public`

## 🤝 Contributing

We welcome contributions to OmniAgent! Please follow these guidelines:

### Development Workflow

1. **Fork the repository** on GitHub
2. **Create a feature branch** from `main`
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes** following the code style
4. **Test your changes** thoroughly
5. **Commit your changes** with descriptive messages
   ```bash
   git commit -m 'Add amazing feature: description'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Create a Pull Request** with detailed description

### Code Style

- **TypeScript**: Use strict type checking
- **ESLint**: Follow the configured linting rules
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Use conventional commit messages

### Reporting Issues

When reporting issues, please include:
- **Environment details** (OS, Node.js version, browser)
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots or videos** if applicable
- **Error messages** and stack traces

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Remix Team](https://remix.run/)** - For the amazing full-stack framework
- **[Tailwind CSS](https://tailwindcss.com/)** - For the utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - For smooth animations
- **[Radix UI](https://www.radix-ui.com/)** - For accessible component primitives
- **[Lucide](https://lucide.dev/)** - For beautiful icons

## 📞 Support

For support and questions:

- **Documentation**: Check our comprehensive docs
- **GitHub Issues**: Report bugs and request features
- **Community**: Join our Discord community
- **Email**: Contact us at support@omniagent.com

---

<p align="center">
  <strong>Built with ❤️ for the future of customer communication</strong>
</p>

<p align="center">
  <a href="#-omniagent---omni-channel-ai-platform">↑ Back to top</a>
</p>
 