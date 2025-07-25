import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, Target, BarChart3 } from 'lucide-react';

const GoogleAdsROICalculator = () => {
  const [inputs, setInputs] = useState({
    monthlyAdSpend: '',
    currentConversionRate: '',
    averageCustomerValue: '',
    currentClickThroughRate: ''
  });

  const [results, setResults] = useState(null);
  const [showImprovement, setShowImprovement] = useState(false);

  // Typical improvement rates that GreenFlow SEM achieves
  const improvements = {
    conversionRateIncrease: 35, // 35% improvement in conversion rate
    ctrIncrease: 25, // 25% improvement in CTR
    costReduction: 20 // 20% reduction in cost per click through optimization
  };

  const calculateROI = () => {
    const spend = parseFloat(inputs.monthlyAdSpend) || 0;
    const convRate = parseFloat(inputs.currentConversionRate) || 0;
    const customerValue = parseFloat(inputs.averageCustomerValue) || 0;
    const ctr = parseFloat(inputs.currentClickThroughRate) || 0;

    if (spend <= 0 || convRate <= 0 || customerValue <= 0) return;

    // Estimate clicks based on average CPC (assuming $2-3 CPC for most industries)
    const estimatedCPC = 2.5;
    const estimatedClicks = spend / estimatedCPC;
    
    // Current performance
    const currentConversions = (estimatedClicks * convRate) / 100;
    const currentRevenue = currentConversions * customerValue;
    const currentROI = ((currentRevenue - spend) / spend) * 100;

    // Improved performance with GreenFlow SEM
    const improvedConvRate = convRate * (1 + improvements.conversionRateIncrease / 100);
    const improvedCPC = estimatedCPC * (1 - improvements.costReduction / 100);
    const improvedClicks = spend / improvedCPC; // More clicks for same budget
    const improvedConversions = (improvedClicks * improvedConvRate) / 100;
    const improvedRevenue = improvedConversions * customerValue;
    const improvedROI = ((improvedRevenue - spend) / spend) * 100;

    // Additional metrics
    const revenueIncrease = improvedRevenue - currentRevenue;
    const conversionIncrease = improvedConversions - currentConversions;
    const roiImprovement = improvedROI - currentROI;

    setResults({
      current: {
        conversions: Math.round(currentConversions * 10) / 10,
        revenue: Math.round(currentRevenue),
        roi: Math.round(currentROI * 10) / 10,
        clicks: Math.round(estimatedClicks)
      },
      improved: {
        conversions: Math.round(improvedConversions * 10) / 10,
        revenue: Math.round(improvedRevenue),
        roi: Math.round(improvedROI * 10) / 10,
        clicks: Math.round(improvedClicks)
      },
      increases: {
        revenue: Math.round(revenueIncrease),
        conversions: Math.round(conversionIncrease * 10) / 10,
        roi: Math.round(roiImprovement * 10) / 10
      }
    });
  };

  useEffect(() => {
    calculateROI();
  }, [inputs]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Calculator className="w-8 h-8 text-green-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-800">Google Ads ROI Calculator</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover how much more revenue you could generate with optimized Google Ads campaigns. 
          See the potential ROI improvements GreenFlow SEM can deliver for your business.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <Target className="w-6 h-6 text-green-600 mr-2" />
            Your Current Performance
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Google Ads Spend
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  placeholder="5000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  value={inputs.monthlyAdSpend}
                  onChange={(e) => handleInputChange('monthlyAdSpend', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Conversion Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="2.5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                value={inputs.currentConversionRate}
                onChange={(e) => handleInputChange('currentConversionRate', e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">Industry average: 2-5%</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average Customer Value
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  placeholder="250"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  value={inputs.averageCustomerValue}
                  onChange={(e) => handleInputChange('averageCustomerValue', e.target.value)}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Lifetime value or average order value</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium text-green-800">GreenFlow SEM Improvements</span>
              </div>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• {improvements.conversionRateIncrease}% improvement in conversion rates</li>
                <li>• {improvements.ctrIncrease}% increase in click-through rates</li>
                <li>• {improvements.costReduction}% reduction in cost-per-click</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 text-blue-600 mr-2" />
            Your ROI Potential
          </h2>

          {results ? (
            <div className="space-y-6">
              {/* Current vs Improved Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                    !showImprovement
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setShowImprovement(false)}
                >
                  Current Performance
                </button>
                <button
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                    showImprovement
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setShowImprovement(true)}
                >
                  With GreenFlow SEM
                </button>
              </div>

              {/* Metrics Display */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-600 font-medium">Monthly Conversions</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {showImprovement ? results.improved.conversions : results.current.conversions}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-green-600 font-medium">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-green-800">
                    {formatCurrency(showImprovement ? results.improved.revenue : results.current.revenue)}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                  <p className="text-sm text-purple-600 font-medium">ROI</p>
                  <p className="text-2xl font-bold text-purple-800">
                    {showImprovement ? results.improved.roi : results.current.roi}%
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                  <p className="text-sm text-orange-600 font-medium">Monthly Clicks</p>
                  <p className="text-2xl font-bold text-orange-800">
                    {showImprovement ? results.improved.clicks : results.current.clicks}
                  </p>
                </div>
              </div>

              {/* Improvement Summary */}
              <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Potential Monthly Increases</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold">{formatCurrency(results.increases.revenue)}</p>
                    <p className="text-sm opacity-90">Additional Revenue</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{results.increases.conversions}+</p>
                    <p className="text-sm opacity-90">More Conversions</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{results.increases.roi}%</p>
                    <p className="text-sm opacity-90">ROI Improvement</p>
                  </div>
                </div>
              </div>

              {/* Annual Projection */}
              <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
                <h4 className="font-semibold text-gray-800 mb-2">Annual Projection</h4>
                <p className="text-lg text-gray-700">
                  Additional <span className="font-bold text-green-600">{formatCurrency(results.increases.revenue * 12)}</span> per year
                </p>
              </div>

              {/* CTA */}
              <div className="text-center pt-4">
                <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                  Get Your Free Google Ads Audit
                </button>
                <p className="text-sm text-gray-600 mt-2">
                  See how GreenFlow SEM can achieve these results for your business
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Enter your current Google Ads data to see your ROI potential</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center mt-8 text-sm text-gray-600">
        <p>* Results based on typical improvements achieved by GreenFlow SEM clients. Individual results may vary.</p>
      </div>
    </div>
  );
};

export default GoogleAdsROICalculator;
