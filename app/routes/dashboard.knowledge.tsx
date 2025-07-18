import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Plus,
  Search,
  Filter,
  Upload,
  FileText,
  Globe,
  Database,
  Brain,
  Zap,
  MoreHorizontal,
  Download,
  Edit,
  Trash2
} from "lucide-react";
import { requireAuth } from "~/lib/auth";
import { PageHeader } from "~/components/dashboard";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request);
  return json({});
}

// Mock knowledge base data
const knowledgeItems = [
  {
    id: '1',
    title: 'Product Documentation',
    type: 'document',
    source: 'Upload',
    size: '2.4 MB',
    lastUpdated: '2 hours ago',
    status: 'active',
    usage: 156,
    icon: '📄'
  },
  {
    id: '2',
    title: 'FAQ Database',
    type: 'database',
    source: 'Manual',
    size: '890 KB',
    lastUpdated: '1 day ago',
    status: 'active',
    usage: 234,
    icon: '❓'
  },
  {
    id: '3',
    title: 'Company Website',
    type: 'web',
    source: 'Web Scraping',
    size: '5.2 MB',
    lastUpdated: '3 hours ago',
    status: 'syncing',
    usage: 89,
    icon: '🌐'
  },
  {
    id: '4',
    title: 'Support Tickets Archive',
    type: 'database',
    source: 'Integration',
    size: '12.1 MB',
    lastUpdated: '6 hours ago',
    status: 'active',
    usage: 67,
    icon: '🎫'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'syncing':
      return 'bg-blue-100 text-blue-800';
    case 'error':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'document':
      return <FileText className="h-4 w-4" />;
    case 'database':
      return <Database className="h-4 w-4" />;
    case 'web':
      return <Globe className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

export default function KnowledgePage() {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <PageHeader
        title="Knowledge Base"
        subtitle="Manage your AI agents' knowledge sources and training data"
        action={
          <div className="flex space-x-2">
            <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center transition-colors">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 px-4 py-2 rounded-lg flex items-center transition-all duration-200">
              <Plus className="h-4 w-4 mr-2" />
              Add Source
            </button>
          </div>
        }
      />

      {/* Knowledge Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
              +2
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">4</h3>
          <p className="text-sm text-gray-600">Knowledge Sources</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600">
              <Database className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
              +15%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">20.6 MB</h3>
          <p className="text-sm text-gray-600">Total Data</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
              +23%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">546</h3>
          <p className="text-sm text-gray-600">AI Queries</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
              98%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">94%</h3>
          <p className="text-sm text-gray-600">Accuracy Rate</p>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search knowledge base..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              Filter
            </button>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Types</option>
              <option>Documents</option>
              <option>Databases</option>
              <option>Web Sources</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Knowledge Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-black/5 border border-white/20 overflow-hidden"
      >
        <div className="divide-y divide-gray-100">
          {knowledgeItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              className="p-6 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        {getTypeIcon(item.type)}
                        <span>{item.type}</span>
                      </div>
                      <span>•</span>
                      <span>{item.source}</span>
                      <span>•</span>
                      <span>{item.size}</span>
                      <span>•</span>
                      <span>Updated {item.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{item.usage}</div>
                    <div className="text-xs text-gray-500">queries</div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreHorizontal className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-100">
              <Upload className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Upload Documents</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Upload PDFs, Word docs, or text files to expand your knowledge base
          </p>
          <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
            Choose Files
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-green-100">
              <Globe className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Web Scraping</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Automatically extract content from websites and keep it updated
          </p>
          <button className="w-full bg-green-100 hover:bg-green-200 text-green-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
            Add Website
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-100">
              <Database className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Connect Database</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Integrate with your existing databases and knowledge systems
          </p>
          <button className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
            Setup Integration
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}