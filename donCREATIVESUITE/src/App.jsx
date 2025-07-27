import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Home, Folder, Star, MoreHorizontal, Grid3X3, List, Filter, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { AuthModal } from '@/components/AuthModal';
function App() {
  const [activeTab, setActiveTab] = useState('designs');
  const [viewMode, setViewMode] = useState('grid');
  const [recentDesigns, setRecentDesigns] = useState([]);
  const [loadingDesigns, setLoadingDesigns] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signIn');
  const {
    toast
  } = useToast();
  const {
    user,
    session,
    signOut
  } = useAuth();
  useEffect(() => {
    const fetchDesigns = async () => {
      setLoadingDesigns(true);
      let query = supabase.from('designs').select('*').order('last_edited_at', {
        ascending: false
      });
      if (user) {
        query = query.eq('user_id', user.id);
      } else {
        query = query.is('user_id', null);
      }
      const {
        data,
        error
      } = await query;
      if (error) {
        toast({
          variant: "destructive",
          title: "Failed to load designs",
          description: error.message
        });
        setRecentDesigns([]);
      } else {
        setRecentDesigns(data);
      }
      setLoadingDesigns(false);
    };
    fetchDesigns();
  }, [session, user, toast]);
  const handleSignOut = async () => {
    const {
      error
    } = await signOut();
    if (!error) {
      toast({
        title: "Successfully signed out!",
        description: "You have been logged out."
      });
    }
  };
  const openAuthModal = mode => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };
  const handleFeatureClick = feature => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      duration: 3000
    });
  };
  const getTimeAgo = date => {
    if (!date) return 'a while ago';
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };
  const designTypes = [{
    name: 'Logo',
    icon: '🎨',
    color: 'bg-purple-500'
  }, {
    name: 'Your Story',
    icon: '📱',
    color: 'bg-pink-500'
  }, {
    name: 'Instagram Story',
    icon: '📸',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500'
  }, {
    name: 'Flyer',
    icon: '📄',
    color: 'bg-blue-500'
  }, {
    name: 'Doc',
    icon: '📝',
    color: 'bg-green-500'
  }, {
    name: 'Whiteboard',
    icon: '⚪',
    color: 'bg-gray-500'
  }, {
    name: 'Presentation',
    icon: '🎯',
    color: 'bg-orange-500'
  }, {
    name: 'Social media',
    icon: '❤️',
    color: 'bg-red-500'
  }, {
    name: 'Wall Photo',
    icon: '🖼️',
    color: 'bg-indigo-500'
  }, {
    name: 'Video',
    icon: '🎬',
    color: 'bg-purple-600'
  }, {
    name: 'Print',
    icon: '🖨️',
    color: 'bg-cyan-500'
  }, {
    name: 'Website',
    icon: '🌐',
    color: 'bg-blue-600'
  }, {
    name: 'Custom size',
    icon: '📐',
    color: 'bg-gray-600'
  }, {
    name: 'Upload',
    icon: '📤',
    color: 'bg-emerald-500'
  }, {
    name: 'More',
    icon: '⋯',
    color: 'bg-slate-600'
  }];
  return <>
      <Helmet>
        <title>Design Platform - Create Amazing Designs</title>
        <meta name="description" content="Professional design platform for creating logos, presentations, social media content and more" />
      </Helmet>
      
      <AuthModal isOpen={isAuthModalOpen} setIsOpen={setIsAuthModalOpen} mode={authMode} setMode={setAuthMode} />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <motion.div initial={{
        x: -100,
        opacity: 0
      }} animate={{
        x: 0,
        opacity: 1
      }} className="fixed left-0 top-0 h-full w-16 bg-white shadow-lg z-50 flex flex-col items-center py-4 space-y-6">
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-600" onClick={() => handleFeatureClick('create')}>
            <Plus className="w-5 h-5" />
          </Button>
          
          <div className="space-y-4">
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-gray-100" onClick={() => handleFeatureClick('home')}><Home className="w-5 h-5" /></Button>
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-gray-100" onClick={() => handleFeatureClick('templates')}><Folder className="w-5 h-5" /></Button>
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-gray-100" onClick={() => handleFeatureClick('brand')}><Star className="w-5 h-5" /></Button>
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-gray-100" onClick={() => handleFeatureClick('apps')}><Grid3X3 className="w-5 h-5" /></Button>
          </div>
        </motion.div>

        <div className="ml-16 min-h-screen">
          <motion.header initial={{
          y: -50,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-8 py-6">
            <div className="max-w-7xl mx-auto relative">
                <div className="absolute top-0 right-0 flex items-center gap-2">
                    {user ? <>
                            <span className="text-sm font-medium text-gray-700">Welcome, {user.email.split('@')[0]}</span>
                            <Button onClick={handleSignOut} variant="outline" size="sm"><LogOut className="mr-2 h-4 w-4" />Log Out</Button>
                        </> : <>
                            <Button onClick={() => openAuthModal('signIn')} variant="ghost" size="sm"><LogIn className="mr-2 h-4 w-4" />Sign In</Button>
                            <Button onClick={() => openAuthModal('signUp')}><UserPlus className="mr-2 h-4 w-4" />Sign Up</Button>
                        </>}
                </div>

              <motion.h1 initial={{
              scale: 0.9
            }} animate={{
              scale: 1
            }} className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent pt-8">Don AI - A Creative Suite</motion.h1>
              
              <div className="flex justify-center mb-8">
                <div className="flex bg-gray-100 rounded-full p-1">
                  <Button variant={activeTab === 'designs' ? 'default' : 'ghost'} className={`rounded-full px-6 ${activeTab === 'designs' ? 'bg-white shadow-sm' : ''}`} onClick={() => setActiveTab('designs')}>📁 Your Saves</Button>
                  <Button variant={activeTab === 'templates' ? 'default' : 'ghost'} className={`rounded-full px-6 ${activeTab === 'templates' ? 'bg-white shadow-sm' : ''}`} onClick={() => setActiveTab('templates')}>Help me design?</Button>
                  <Button variant={activeTab === 'ai' ? 'default' : 'ghost'} className={`rounded-full px-6 ${activeTab === 'ai' ? 'bg-white shadow-sm' : ''}`} onClick={() => setActiveTab('ai')}>✨ Don AI</Button>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative max-w-2xl w-full">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input type="text" placeholder="Search millions of templates..." className="w-full pl-12 pr-16 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm" onClick={() => handleFeatureClick('search')} />
                  <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-xl bg-purple-600 hover:bg-purple-700" onClick={() => handleFeatureClick('search')}>→</Button>
                </div>
              </div>
            </div>
          </motion.header>

          <motion.section initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }} className="px-8 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-15 gap-4 mb-12">
                {designTypes.map((type, index) => <motion.div key={type.name} initial={{
                opacity: 0,
                scale: 0.8
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                delay: index * 0.05
              }} whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} className="flex flex-col items-center space-y-2 cursor-pointer group" onClick={() => handleFeatureClick(type.name)}>
                    <div className={`w-16 h-16 ${type.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg group-hover:shadow-xl transition-all duration-200`}>{type.icon}</div>
                    <span className="text-sm font-medium text-gray-700 text-center">{type.name}</span>
                  </motion.div>)}
              </div>
            </div>
          </motion.section>

          <motion.section initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }} className="px-8 pb-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent designs</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className={`w-10 h-10 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`} onClick={() => setViewMode('grid')}><Grid3X3 className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className={`w-10 h-10 ${viewMode === 'list' ? 'bg-gray-100' : ''}`} onClick={() => setViewMode('list')}><List className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="w-10 h-10" onClick={() => handleFeatureClick('filter')}><Filter className="w-4 h-4" /></Button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={viewMode} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -20
              }} className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6' : 'space-y-4'}>
                  {loadingDesigns ? Array.from({
                  length: 8
                }).map((_, index) => <div key={index} className="bg-white rounded-2xl shadow-sm animate-pulse"><div className="aspect-[3/4] bg-gray-200"></div><div className="p-4 space-y-2"><div className="h-4 bg-gray-200 rounded"></div><div className="h-3 bg-gray-200 rounded w-3/4"></div></div></div>) : recentDesigns.map((design, index) => <motion.div key={design.id} initial={{
                  opacity: 0,
                  scale: 0.9
                }} animate={{
                  opacity: 1,
                  scale: 1
                }} transition={{
                  delay: index * 0.1
                }} whileHover={{
                  scale: 1.02
                }} className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group ${viewMode === 'list' ? 'flex items-center p-4 space-x-4' : 'overflow-hidden'}`} onClick={() => handleFeatureClick('open design')}>
                        {viewMode === 'grid' ? <>
                            <div className={`aspect-[3/4] ${design.thumbnail_bg} relative`}>
                              {design.is_private && <div className="absolute top-3 left-3 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1"><span className="text-white text-xs font-medium">🔒 Private</span></div>}
                              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="w-8 h-8 bg-white/80 backdrop-blur-sm hover:bg-white" onClick={e => {
                          e.stopPropagation();
                          handleFeatureClick('more options');
                        }}>
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-gray-900 mb-1 truncate">{design.title}</h3>
                              <p className="text-sm text-gray-500 mb-2">{design.type} • Edited {getTimeAgo(design.last_edited_at)}</p>
                            </div>
                          </> : <>
                            <div className={`w-16 h-16 ${design.thumbnail_bg} rounded-xl flex-shrink-0`}></div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 truncate">{design.title}</h3>
                              <p className="text-sm text-gray-500">{design.type} • Edited {getTimeAgo(design.last_edited_at)}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0" onClick={e => {
                      e.stopPropagation();
                      handleFeatureClick('more options');
                    }}>
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </>}
                      </motion.div>)}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.section>
        </div>
      </div>
    </>;
}
export default App;