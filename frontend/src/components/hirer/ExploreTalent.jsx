import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Home, Briefcase, Menu, X,Bell,Palette,Megaphone,Languages,Laptop,Smartphone,Type,TrendingUp ,ChevronsLeftRight, Paintbrush} from 'lucide-react';
import FreelancerCardExpanded from './FreelancerCardExpand';
import api from '../../api/Api';
import logo from '../../img/logo.png'

const categories = [
  { id: "design", name: "Design", icon:  Paintbrush },
  { id: "marketing", name: "Marketing", icon: Megaphone },
  { id: "translation", name: "Translation", icon: Type },
  { id: "tech", name: "Tech", icon: ChevronsLeftRight },
  { id: "social-media", name: "Social Media", icon: TrendingUp },
];

const FreelancerCard = ({ freelancer, showCategory, isExpanded, onClick }) => {
  const { personalInfo, professionalInfo, stats, availability } = freelancer;
  
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer overflow-hidden"
    >
      {/* Collapsed Card View */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                {personalInfo.avatar ? (
                  <img src={personalInfo.avatar} alt={personalInfo.fullName} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-xl font-semibold">
                    {personalInfo.fullName?.charAt(0)}
                  </span>
                )}
              </div>
              {availability.status === 'Available' && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{personalInfo.fullName}</h3>
              <p className="text-sm text-gray-600">{personalInfo.jobTitle || professionalInfo.title}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm font-medium text-gray-900">
              {stats.rating || '4.2'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
          <span>🇺🇸</span>
          <span>{personalInfo.city}, {personalInfo.country}</span>
        </div>
        
        {showCategory && (
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full">
              {professionalInfo.category}
            </span>
          </div>
        )}
        
        <p className="text-sm text-gray-600">
          {personalInfo.oneLineDescription || personalInfo.description}
        </p>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <FreelancerCardExpanded freelancer={freelancer} />
      )}
    </div>
  );
};

const FreelancerListing = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [freelancers, setFreelancers] = useState([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetchFreelancers();
  }, []);

  const fetchFreelancers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/freelancer/all');
      
      if (response.data.status === 200 && response.data.data) {
        setFreelancers(response.data.data);
        setFilteredFreelancers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching freelancers:', error);
      setError('Failed to load freelancers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      const filtered = freelancers.filter(
        f => f.professionalInfo.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredFreelancers(filtered);
    } else {
      setFilteredFreelancers(freelancers);
    }
  }, [selectedCategory, freelancers]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      if (selectedCategory) {
        const filtered = freelancers.filter(
          f => f.professionalInfo.category.toLowerCase() === selectedCategory.toLowerCase()
        );
        setFilteredFreelancers(filtered);
      } else {
        setFilteredFreelancers(freelancers);
      }
      return;
    }

    const searchLower = query.toLowerCase();
    const filtered = (selectedCategory 
      ? freelancers.filter(f => f.professionalInfo.category.toLowerCase() === selectedCategory.toLowerCase())
      : freelancers
    ).filter(f => 
      f.personalInfo.fullName.toLowerCase().includes(searchLower) ||
      f.personalInfo.jobTitle?.toLowerCase().includes(searchLower) ||
      f.professionalInfo.title?.toLowerCase().includes(searchLower) ||
      f.professionalInfo.skills.some(s => s.name.toLowerCase().includes(searchLower))
    );
    setFilteredFreelancers(filtered);
  };

  const handleCardClick = (freelancerId) => {
    setExpandedCardId(expandedCardId === freelancerId ? null : freelancerId);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md bg-gray-50 shadow-sm">
        {/* Side Menu Drawer */}
         <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${ isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}onClick={() => setIsMenuOpen(false)}/>
          <div 
            className={`fixed top-0 left-0 h-full w-64 bg-white z-50 rounded-r-xl transform transition-transform duration-300 ${
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="text-blue-500">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                  </div>
                  <span className="text-blue-500 font-semibold">SKAYOFFICE</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="p-2">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <nav className="space-y-2">
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Home</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg">
                  <Search className="w-5 h-5" />
                  <span className="font-medium">Explore Talent</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Briefcase className="w-5 h-5" />
                  <span className="font-medium">Get Hired</span>
                </a>
              </nav>
            </div>
          </div>

        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsMenuOpen(true)} className="p-2">
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex items-center gap-2">
                {/* <div className="text-blue-500">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                </div>
                <span className="text-blue-500 font-semibold text-lg">SKAYOFFICE</span> */}
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-6">
              <button className="relative">
                <div className="w-4 h-4 text-gray-600"><Bell/></div>
                <span className="absolute -top-0.5 -right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xs font-semibold">MS</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
      
          <div className="px-4 pb-3 mt-6">
            <div className="flex items-center gap-3">
              
              {/* INPUT WITH RIGHT SEARCH ICON */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by skill, role, or name"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                {/* Right-side Search Icon INSIDE input */}
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* FILTER BUTTON outside input */}
              <button className="">
                <SlidersHorizontal className="w-5 h-5 text-blue-500" />
              </button>

            </div>
          </div>


          {/* Categories */}
          <div className="w-full flex justify-center pt-6 pb-6 border-t scrollbar-hide mt-4 shadow-sm">
            <div className="flex gap-4  w-full justify-evenly">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                  className={`flex flex-col items-center gap-1 min-w-fit ${
                    selectedCategory === cat.id ? 'opacity-100' : 'opacity-70'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    selectedCategory === cat.id 
                      ? 'bg-[#5A4DFF] text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                     <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-sm text-gray-700 whitespace-nowrap ${selectedCategory === cat.id 
                      ? 'text-gray-800 font-medium' 
                      : ' text-gray-600'}`}>{cat.name}</span>
                </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Explore Talent</h1>
              <p className="text-sm text-gray-500">Browse verified professionals</p>
            </div>
            <button className="text-sm text-gray-600 flex items-center gap-1">
              <span>Sort</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-600 text-sm">{error}</p>
              <button 
                onClick={fetchFreelancers}
                className="mt-2 text-blue-600 text-sm font-medium"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Freelancer Cards */}
          {!loading && !error && (
            <div className="space-y-3">
              {filteredFreelancers.length > 0 ? (
                filteredFreelancers.map((freelancer) => (
                  <FreelancerCard
                    key={freelancer._id}
                    freelancer={freelancer}
                    showCategory={!selectedCategory}
                    isExpanded={expandedCardId === freelancer._id}
                    onClick={() => handleCardClick(freelancer._id)}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No freelancers found</p>
                </div>
              )}
            </div>
          )}
        </main>
     </div>
    </div>
  );
};

export default FreelancerListing;