import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Home, Briefcase, Menu, X,Bell,Palette,Megaphone,Languages,Laptop,Smartphone,ArrowDownWideNarrow ,Type,TrendingUp ,ChevronsLeftRight, Paintbrush} from 'lucide-react';
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
  if (isExpanded) {
    return (
      <div 
          onClick={onClick}
        className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer"
      >
        <FreelancerCardExpanded freelancer={freelancer} onClose={onClick} />
      </div>
    );
  }
  
  return (
    <div onClick={onClick} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer overflow-hidden">
      <div className="p-4 border-t-8 border-t-[#5A4DFF24]">
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
          
          <div className="flex items-center gap-1 rounded-xl bg-gray-100 px-2 py-1">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm font-medium text-gray-700">
              {stats.rating || '4.2'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
          <span>{personalInfo.city}, {personalInfo.country}</span>
        </div>
        
        <p className="text-sm text-gray-600">
          {personalInfo.oneLineDescription || personalInfo.description}
        </p>
        {showCategory && (
          <div className="mt-3">
            <span className="inline-block px-6 py-1.5 bg-[#E0E7FF] text-[#5A4DFF] text-xs font-medium rounded-full">
              {professionalInfo.category}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const FreelancerListing = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [freelancers, setFreelancers] = useState([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedCardIds, setExpandedCardIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filterCategory, setFilterCategory] = useState([]);
  const [priceRange, setPriceRange] = useState([20, 100]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState('');
  const [availableNow, setAvailableNow] = useState(false);

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
    setExpandedCardIds(prev => {
      if (prev.includes(freelancerId)) {
        return prev.filter(id => id !== freelancerId);
      } else {
        return [...prev, freelancerId];
      }
    });
  };

const handleCategoryFilter = (category) => {
  setFilterCategory(prev => {
    if (prev.includes(category)) {
      return prev.filter(c => c !== category);
    } else {
      return [...prev, category];
    }
  });
};

const handleResetFilters = () => {
  setFilterCategory([]);
  setPriceRange([20, 100]);
  setRemoteOnly(false);
  setExperienceLevel('');
  setAvailableNow(false);
};

const handleApplyFilters = () => {
  // Apply filter logic here
  setIsFilterOpen(false);
};

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="w-full max-w-md bg-gray-50 shadow-sm">
        {/* Side Menu Drawer */}
         <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${ isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}onClick={() => setIsMenuOpen(false)}/>
          <div 
            className={`fixed top-0 left-0 h-full w-[368px] bg-white z-50 rounded-r-xl transform transition-transform duration-300 ${
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
            <div className="p-4 flex flex-col gap-y-8">
              <div className="flex items-center justify-between pl-2 pr-2">
                <div className="flex items-center gap-2">
                  {/* <div className="text-blue-500">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                  </div>
                  <span className="text-blue-500 font-semibold">SKAYOFFICE</span> */}
                    <img src={logo} alt="Logo" className="w-full h-full object-cover" />
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
                <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#EEF2FF] text-[#4F39F6] rounded-lg">
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

         
          <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => setIsMenuOpen(true)} className="p-2">
                  <Menu className="w-6 h-6 text-gray-600" />
                </button>
                <div className="flex items-center gap-2">
                  <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-6">
                <button className="relative">
                  <div className="w-4 h-4 text-gray-600"><Bell/></div>
                  <span className="absolute -top-0.5 -right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="w-8 h-8 bg-[#E8E6FF] rounded-full flex items-center justify-center">
                  <span className="text-[#5A4DFF] text-xs font-semibold">MS</span>
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
                <button onClick={() => setIsFilterOpen(true)} className="">
                  <SlidersHorizontal className="w-5 h-5 text-[#5A4DFF]" />
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
                        ? 'bg-[#5A4DFF] text-white shadow-[0_4px_6px_rgba(90,77,255,0.5)]' 
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

         
          <main className="px-4 py-4 bg-gray-100 ">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Explore Talent</h1>
                <p className="text-sm text-gray-500">Browse verified professionals</p>
              </div>
              <button className="text-sm text-gray-600 flex items-center justify-center gap-x-2 border rounded-full p-2 bg-white">
              
                {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg> */}
                <ArrowDownWideNarrow size={18} className=''/>
                 <span className=''>Sort</span>
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
                      isExpanded={expandedCardIds.includes(freelancer._id)}
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


          
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsFilterOpen(false)} />
          <div
            className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 
              bg-white rounded-t-3xl z-50 transition-all duration-300 
              max-h-[70vh] w-full max-w-md overflow-y-auto
              ${
                isFilterOpen
                  ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
                  : 'translate-y-10 opacity-0 scale-95 pointer-events-none'
              }
            `}
          >


          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-10">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryFilter(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filterCategory.includes(cat.id)
                        ? 'bg-blue-100 text-blue-600 border-2 border-blue-600'
                        : 'bg-gray-100 text-gray-700 border-2 border-transparent'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget / Pricing */}
            <div className="mb-10">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Budget / Pricing</h3>
              <div className="px-2">
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>${priceRange[0]}/hr</span>
                  <span>${priceRange[1]}/hr</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mb-10">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Location</h3>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select location</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="in">India</option>
                <option value="ca">Canada</option>
              </select>
              
              <label className="flex items-center gap-3 mt-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remoteOnly}
                  onChange={(e) => setRemoteOnly(e.target.checked)}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-900">Remote only</span>
              </label>
            </div>

            {/* Experience Level */}
            <div className="mb-10">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Experience Level</h3>
              <div className="space-y-3">
                {['Beginner', 'Intermediate', 'Expert'].map((level) => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="experience"
                      checked={experienceLevel === level}
                      onChange={() => setExperienceLevel(level)}
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-900">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-10">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Availability</h3>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-900">Available now</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={availableNow}
                    onChange={(e) => setAvailableNow(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors ${availableNow ? 'bg-blue-600' : 'bg-gray-300'}`}>
                    <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${availableNow ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </div>
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-10">
              <button
                onClick={handleResetFilters}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Reset Filters
              </button>
              <button
                onClick={handleApplyFilters}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default FreelancerListing;