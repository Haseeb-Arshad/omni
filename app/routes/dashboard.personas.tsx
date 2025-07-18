import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { motion } from "framer-motion";
import { 
  Brain, 
  Plus,
  Settings,
  Copy,
  Edit,
  Trash2,
  User,
  MessageSquare,
  Zap,
  Star,
  MoreHorizontal
} from "lucide-react";
import { requireAuth } from "~/lib/auth";
import { PageHeader } from "~/components/dashboard";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request);
  return json({});
}

// Mock personas data
const personas = [
  {
    id: '1',
    name: 'Professional Assistant',
    description: 'Formal, helpful, and business-oriented communication style',
    tone: 'Professional',
    style: 'Formal & Helpful',
    usedBy: 3,
    conversations: 456,
    rating: 4.8,
    avatar: '👔',
    color: 'from-blue-500 to-blue-600',
    traits: ['Polite', 'Informative', 'Solution-focused'],
    sampleResponse: 'Thank you for contacting us. I\'d be happy to assist you with your inquiry. Could you please provide more details about the issue you\'re experiencing?'
  },
  {
    id: '2',
    name: 'Friendly Helper',
    description: 'Warm, casual, and approachable personality',
    tone: 'Friendly',
    style: 'Casual & Warm',
    usedBy: 2,
    conversations: 234,
    rating: 4.9,
    avatar: '😊',
    color: 'from-green-500 to-green-600',
    traits: ['Empathetic', 'Encouraging', 'Patient'],
    sampleResponse: 'Hey there! 😊 I\'m here to help you out. What can I do for you today? Don\'t worry, we\'ll get this sorted together!'
  },
  {
    id: '3',
    name: 'Technical Expert',
    description: 'Knowledgeable, precise, and detail-oriented',
    tone: 'Technical',
    style: 'Precise & Detailed',
    usedBy: 1,
    conversations: 189,
    rating: 4.7,
    avatar: '🔧',
    color: 'from-purple-500 to-purple-600',
    traits: ['Analytical', 'Thorough', 'Methodical'],
    sampleResponse: 'I\'ll analyze your technical issue systematically. First, let\'s verify the current configuration and identify the root cause of the problem.'
  },
  {
    id: '4',
    name: 'Sales Enthusiast',
    description: 'Persuasive, energetic, and results-driven',
    tone: 'Persuasive',
    style: 'Energetic & Confident',
    usedBy: 1,
    conversations: 123,
    rating: 4.6,
    avatar: '💼',
    color: 'from-orange-500 to-orange-600',
    traits: ['Confident', 'Persuasive', 'Goal-oriented'],
    sampleResponse: 'Great choice reaching out! This is exactly what you need to take your business to the next level. Let me show you how this can transform your results!'
  }
];

const getToneColor = (tone: string) => {
  switch (tone.toLowerCase()) {
    case 'professional':
      return 'bg-blue-100 text-blue-800';
    case 'friendly':
      return 'bg-green-100 text-green-800';
    case 'technical':
      return 'bg-purple-100 text-purple-800';
    case 'persuasive':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function PersonasPage() {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <PageHeader
        title="AI Personas"
        subtitle="Create and manage different personality profiles for your AI agents"
        action={
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 px-4 py-2 rounded-lg flex items-center transition-all duration-200">
            <Plus className="h-4 w-4 mr-2" />
            Create Persona
          </button>
        }
      />

      {/* Persona Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
              +1
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">4</h3>
          <p className="text-sm text-gray-600">Total Personas</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600">
              <User className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
              100%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">7</h3>
          <p className="text-sm text-gray-600">Active Usage</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
              +18%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">1,002</h3>
          <p className="text-sm text-gray-600">Conversations</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600">
              <Star className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
              +0.2
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">4.8</h3>
          <p className="text-sm text-gray-600">Avg Rating</p>
        </div>
      </motion.div>

      {/* Personas Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {personas.map((persona, index) => (
          <motion.div
            key={persona.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20 hover:shadow-xl hover:shadow-black/10 transition-all duration-300"
          >
            {/* Persona Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${persona.color}`}>
                  <span className="text-2xl">{persona.avatar}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{persona.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{persona.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getToneColor(persona.tone)}`}>
                      {persona.tone}
                    </span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-600">{persona.style}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            {/* Persona Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <User className="h-4 w-4 text-blue-500" />
                  <span className="text-lg font-bold text-gray-900">{persona.usedBy}</span>
                </div>
                <p className="text-xs text-gray-600">Agents</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <MessageSquare className="h-4 w-4 text-green-500" />
                  <span className="text-lg font-bold text-gray-900">{persona.conversations}</span>
                </div>
                <p className="text-xs text-gray-600">Conversations</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-lg font-bold text-gray-900">{persona.rating}</span>
                </div>
                <p className="text-xs text-gray-600">Rating</p>
              </div>
            </div>

            {/* Personality Traits */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Personality Traits</h4>
              <div className="flex flex-wrap gap-2">
                {persona.traits.map((trait) => (
                  <span
                    key={trait}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Sample Response */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Sample Response</h4>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600 italic">"{persona.sampleResponse}"</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                <Copy className="h-4 w-4 mr-1" />
                Duplicate
              </button>
              <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
              <button className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Persona Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Persona Templates</h3>
            <p className="text-sm text-gray-600">Quick start with pre-built personality templates</p>
          </div>
          <Zap className="h-6 w-6 text-gray-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Empathetic Counselor', icon: '💝', description: 'Supportive and understanding for sensitive topics' },
            { name: 'Witty Companion', icon: '😄', description: 'Humorous and engaging for casual conversations' },
            { name: 'Authoritative Expert', icon: '🎓', description: 'Knowledgeable and confident for complex queries' }
          ].map((template, index) => (
            <motion.button
              key={template.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className="p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group text-left"
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{template.icon}</div>
                <div>
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                    {template.name}
                  </h4>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}