import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { motion } from "framer-motion";
import { 
  Headphones, 
  Plus,
  Play,
  Pause,
  Volume2,
  Mic,
  Settings,
  Waveform,
  Download,
  Upload
} from "lucide-react";
import { requireAuth } from "~/lib/auth";
import { PageHeader } from "~/components/dashboard";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request);
  return json({});
}

export default function VoicePage() {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <PageHeader
        title="Voice Studio"
        subtitle="Create and manage voice profiles for your AI agents"
        action={
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 px-4 py-2 rounded-lg flex items-center transition-all duration-200">
            <Plus className="h-4 w-4 mr-2" />
            Create Voice
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Voice Profiles</h3>
          <div className="space-y-4">
            {['Professional Male', 'Friendly Female', 'Energetic Youth'].map((voice, index) => (
              <div key={voice} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Headphones className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">{voice}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                    <Play className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                    <Settings className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Voice Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Speed</label>
              <input type="range" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pitch</label>
              <input type="range" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Volume</label>
              <input type="range" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}