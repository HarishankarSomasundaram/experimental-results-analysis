import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ScatterChart, Scatter, ResponsiveContainer } from 'recharts';

const ExperimentalResultsAnalysis = () => {
  // Parse the data
  const rawData = `TotalWaitTime	Episodes	FinalMakespan	ObjectiveValue	Priorities	ReplayBufferSize	ConvergenceEpisode	Configuration	ConvergenceRate	RunNumber	ImprovementOverPDQPN	PDQPNReference	MaxSteps	Patients	Activities	CompletedActivities	ClippingParameter	AverageWaitTime
1439.0892447311498	100	88.86600882150564	204.76828835290158	1	2000	6	10-06-01	0.06	1	25.944992648745295	120	2000	10	6	60	0.2	23.984820745519166
1545.3983405229292	500	104.51442035588656	203.3177739879499	1	2000	6	10-06-01	0.012	1	12.90464970342787	120	2000	10	6	60	0.2	25.756639008715485
1878.7616937460602	700	96.95133138	199.77479420453966	1	2000	6	10-06-01	0.008571429	1	19.20722385276067	120	2000	10	6	60	0.2	31.31269489576767
2074.6099303148694	1000	104.51442035588656	198.0779135940934	1	2000	6	10-06-01	0.006	1	12.90464970342787	120	2000	10	6	60	0.2	34.57683217191449
2459.4935596121513	1500	112.41793687049599	193.30859444617585	1	2000	6	10-06-01	0.004	1	6.318385941253339	120	2000	10	6	60	0.2	40.99155932686919
1393.1195846017142	2000	85.26925423587909	205.80420565816164	1	2000	6	10-06-01	0.003	1	28.942288136767424	120	2000	10	6	60	0.2	23.218659743361904
1671.8999570699514	5000	97.71451297802096	202.88716732504463	1	2000	6	10-06-01	0.0012	1	18.57123918498253	120	2000	10	6	60	0.2	27.864999284499188
1772.1308370075349	7500	103.90754087104924	201.58728081512118	1	2000	6	10-06-01	0.0008	1	13.41038260745897	120	2000	10	6	60	0.2	29.53551395012558
2053.0804466159225	10000	100.17682204822549	197.33120361024388	1	2000	6	10-06-01	0.0006	1	16.519314959812093	120	2000	10	6	60	0.2	34.21800744359871
1171.4852568202773	100	66.80153173	195.6636710188829	2	2000	41	10-06-02	0.41	1	46.558774619672164	125	2000	10	6	60	0.2	19.524754280337955
1034.0734144017365	500	62.29220809985333	197.7248704882491	2	2000	138	10-06-02	0.276	1	50.16623352011733	125	2000	10	6	60	0.2	17.23455690669561
1217.4623964955847	700	67.68610868939138	194.85924595971628	2	2000	138	10-06-02	0.19714285714285715	1	45.85111305	125	2000	10	6	60	0.2	20.291039941593077
753.5184760224699	1000	59.07839213	201.3033057989072	2	2000	965	10-06-02	0.965	1	52.73728629323495	125	2000	10	6	60	0.2	12.558641267041166
1370.5704786716633	1500	74.01769522709961	193.13584453850692	2	2000	965	10-06-02	0.6433333333333333	1	40.78584381832031	125	2000	10	6	60	0.2	22.842841311194388
1122.9090491962625	2000	63.536028310238216	196.3371034688388	2	2000	965	10-06-02	0.4825	1	49.171177351809426	125	2000	10	6	60	0.2	18.71515081993771
849.0019733	5000	66.84995676356046	200.47550525581863	2	2000	3626	10-06-02	0.7252	1	46.520034589151635	125	2000	10	6	60	0.2	14.15003289
872.1702627322737	7500	60.51524454904616	199.54983215525442	2	2000	3626	10-06-02	0.48346666666666666	1	51.587804360763066	125	2000	10	6	60	0.2	14.536171045537895
616.7905600469113	10000	62.929497796716134	203.29106536478264	2	2000	3626	10-06-02	0.3626	1	49.65640176	125	2000	10	6	60	0.2	10.279842667448522
989.9464258418461	100	70.06183750815408	181.9616995244784	3	2000	66	10-06-03	0.66	1	46.106278839881476	130	2000	10	6	60	0.2	16.499107097364103
418.8444292158031	500	61.079294962615414	189.4977420416268	3	2000	66	10-06-03	0.132	1	53.01592695183429	130	2000	10	6	60	0.2	6.980740486930051
872.1164396224682	700	70.12220542782075	182.63286199296152	3	2000	66	10-06-03	0.094285714	1	46.05984197859942	130	2000	10	6	60	0.2	14.535273993707802
592.9554523801862	1000	64.53036468603577	186.8032480043552	3	2000	66	10-06-03	0.066	1	50.361257933818635	130	2000	10	6	60	0.2	9.882590873003103
548.9679179401057	1500	59.05872082423146	186.67940551479467	3	2000	66	10-06-03	0.044	1	54.570214750591184	130	2000	10	6	60	0.2	9.149465299001763
1250.9503099784947	2000	79.58605078968385	178.2447476183302	3	2000	66	10-06-03	0.033	1	38.77996093101242	130	2000	10	6	60	0.2	20.84917183297491
546.2814535651501	5000	65.18929659796123	188.1260072254671	3	2000	66	10-06-03	0.0132	1	49.854387232337515	130	2000	10	6	60	0.2	9.104690892752501
724.9612892362532	7500	63.58965858808362	184.49870843133854	3	2000	66	10-06-03	0.0088	1	51.084878009166445	130	2000	10	6	60	0.2	12.082688153937552
359.8621567939307	10000	59.43273345918988	190.0435655623659	3	2000	66	10-06-03	0.0066	1	54.282512723700094	130	2000	10	6	60	0.2	5.997702613232178`;

  const data = useMemo(() => {
    try {
      const lines = rawData.trim().split('\n');
      const headers = lines[0].split(/\s+/);
      return lines.slice(1).map((line, index) => {
        const values = line.split(/\s+/);
        const row = { id: index };
        headers.forEach((header, i) => {
          const value = values[i];
          if (!isNaN(value) && value !== '########') {
            row[header] = parseFloat(value);
          } else {
            row[header] = value;
          }
        });
        return row;
      });
    } catch (error) {
      console.error('Error parsing data:', error);
      return [];
    }
  }, []);

  const [selectedMetric, setSelectedMetric] = useState('TotalWaitTime');
  const [selectedView, setSelectedView] = useState('episodes');

  const metrics = [
    'TotalWaitTime', 'FinalMakespan', 'ObjectiveValue', 'ConvergenceRate', 
    'ImprovementOverPDQPN', 'AverageWaitTime', 'ConvergenceEpisode'
  ];

  const episodeGroups = useMemo(() => {
    const grouped = {};
    data.forEach(row => {
      const episodes = row.Episodes;
      if (!grouped[episodes]) grouped[episodes] = [];
      grouped[episodes].push(row);
    });
    return grouped;
  }, [data]);

  const configurationGroups = useMemo(() => {
    const grouped = {};
    data.forEach(row => {
      const config = row.Configuration;
      if (!grouped[config]) grouped[config] = [];
      grouped[config].push(row);
    });
    return grouped;
  }, [data]);

  const runComparison = useMemo(() => {
    return data.map(row => ({
      ...row,
      EpisodeGroup: `${row.Episodes} Episodes`,
      RunLabel: `${row.Configuration}-${row.Episodes}ep`,
      ConfigEpisodeKey: `${row.Configuration} (${row.Episodes} ep)`
    }));
  }, [data]);

  // Modified summaryStats to group by configuration and episode count
  const summaryStats = useMemo(() => {
    const episodeData = {};
    
    // Get unique episode counts
    const uniqueEpisodes = [...new Set(data.map(d => d.Episodes))].sort((a, b) => a - b);
    
    // Initialize data structure for each episode count
    uniqueEpisodes.forEach(episodes => {
      episodeData[episodes] = { episodes };
    });
    
    // Group data by configuration and calculate averages for each episode count
    const configurations = [...new Set(data.map(d => d.Configuration))].sort();
    
    configurations.forEach(config => {
      const configData = data.filter(d => d.Configuration === config);
      
      uniqueEpisodes.forEach(episodes => {
        const episodeConfigData = configData.filter(d => d.Episodes === episodes);
        
        if (episodeConfigData.length > 0) {
          const avg = episodeConfigData.reduce((sum, r) => {
            const value = selectedMetric === 'TotalWaitTime' ? r.TotalWaitTime :
                         selectedMetric === 'FinalMakespan' ? r.FinalMakespan :
                         selectedMetric === 'ImprovementOverPDQPN' ? r.ImprovementOverPDQPN :
                         selectedMetric === 'ConvergenceRate' ? r.ConvergenceRate :
                         selectedMetric === 'AverageWaitTime' ? r.AverageWaitTime :
                         selectedMetric === 'ObjectiveValue' ? r.ObjectiveValue :
                         selectedMetric === 'ConvergenceEpisode' ? r.ConvergenceEpisode : 0;
            return sum + value;
          }, 0) / episodeConfigData.length;
          
          episodeData[episodes][config] = avg;
        }
      });
    });
    
    return Object.values(episodeData);
  }, [data, selectedMetric]);

  const configurationStats = useMemo(() => {
    const stats = {};
    Object.keys(configurationGroups).forEach(config => {
      const group = configurationGroups[config];
      stats[config] = {
        configuration: config,
        avgWaitTime: group.reduce((sum, r) => sum + r.TotalWaitTime, 0) / group.length,
        avgMakespan: group.reduce((sum, r) => sum + r.FinalMakespan, 0) / group.length,
        avgImprovement: group.reduce((sum, r) => sum + r.ImprovementOverPDQPN, 0) / group.length,
        avgConvergenceRate: group.reduce((sum, r) => sum + r.ConvergenceRate, 0) / group.length,
        avgConvergenceEpisode: group.reduce((sum, r) => sum + r.ConvergenceEpisode, 0) / group.length,
        count: group.length,
        minWaitTime: Math.min(...group.map(r => r.TotalWaitTime)),
        maxWaitTime: Math.max(...group.map(r => r.TotalWaitTime)),
        stdWaitTime: Math.sqrt(group.reduce((sum, r) => sum + Math.pow(r.TotalWaitTime - (group.reduce((s, row) => s + row.TotalWaitTime, 0) / group.length), 2), 0) / group.length)
      };
    });
    return Object.values(stats).sort((a, b) => a.configuration.localeCompare(b.configuration));
  }, [configurationGroups]);

  const renderConfigurationChart = () => {
    if (configurationStats.length === 0) return <div>No data available</div>;
    
    const metricKey = selectedMetric === 'TotalWaitTime' ? 'avgWaitTime' :
                     selectedMetric === 'FinalMakespan' ? 'avgMakespan' :
                     selectedMetric === 'ImprovementOverPDQPN' ? 'avgImprovement' :
                     selectedMetric === 'ConvergenceEpisode' ? 'avgConvergenceEpisode' : 'avgConvergenceRate';
    
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={configurationStats} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="configuration" />
          <YAxis />
          <Tooltip formatter={(value) => [Number(value).toFixed(2), `Average ${selectedMetric}`]} />
          <Legend />
          <Bar dataKey={metricKey} fill="#8B5CF6" name={`Average ${selectedMetric}`} />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  // Modified episodes chart to show configurations as separate lines
  const renderEpisodesChart = () => {
    if (summaryStats.length === 0) return <div>No data available</div>;
    
    const configurations = [...new Set(data.map(d => d.Configuration))].sort();
    const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];
    
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={summaryStats} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="episodes" />
          <YAxis />
          <Tooltip formatter={(value, name) => [Number(value).toFixed(2), `Config ${name} - ${selectedMetric}`]} />
          <Legend />
          {configurations.map((config, index) => (
            <Line 
              key={config}
              type="monotone" 
              dataKey={config} 
              stroke={colors[index % colors.length]} 
              strokeWidth={2}
              name={config}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderRunsChart = () => {
    if (runComparison.length === 0) return <div>No data available</div>;
    
    // Group data by configuration for better visualization
    const configurations = [...new Set(data.map(d => d.Configuration))].sort();
    const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];
    
    // Create data structure for grouped bar chart
    const episodeCounts = [...new Set(data.map(d => d.Episodes))].sort((a, b) => a - b);
    const chartData = episodeCounts.map(episodes => {
      const episodeData = { episodes };
      
      configurations.forEach(config => {
        const configRuns = data.filter(d => d.Configuration === config && d.Episodes === episodes);
        configRuns.forEach((run, index) => {
          episodeData[`${config}_run${index + 1}`] = run[selectedMetric];
        });
      });
      
      return episodeData;
    });
    
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="episodes" />
          <YAxis />
          <Tooltip formatter={(value, name) => {
            const [config, runInfo] = name.split('_');
            return [Number(value).toFixed(2), `Config ${config} ${runInfo} - ${selectedMetric}`];
          }} />
          <Legend formatter={(value) => {
            const [config, runInfo] = value.split('_');
            return `Config ${config} ${runInfo}`;
          }} />
          {configurations.map((config, configIndex) => {
            // Each configuration can have multiple runs per episode count
            const maxRuns = Math.max(...episodeCounts.map(ep => 
              data.filter(d => d.Configuration === config && d.Episodes === ep).length
            ));
            
            return Array.from({ length: maxRuns }, (_, runIndex) => (
              <Bar 
                key={`${config}_run${runIndex + 1}`}
                dataKey={`${config}_run${runIndex + 1}`}
                fill={colors[configIndex % colors.length]}
                fillOpacity={0.7 + (runIndex * 0.1)}
                name={`${config}_run${runIndex + 1}`}
              />
            ));
          }).flat()}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderScatterChart = () => {
    if (data.length === 0) return <div>No data available</div>;
    
    return (
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="Episodes" />
          <YAxis type="number" dataKey={selectedMetric} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name={selectedMetric} fill="#3B82F6" />
        </ScatterChart>
      </ResponsiveContainer>
    );
  };

  // Safe data access with fallbacks
  const safeData = data.length > 0 ? data : [];
  const minWaitTime = safeData.length > 0 ? Math.min(...safeData.map(d => d.TotalWaitTime || 0)) : 0;
  const maxImprovement = safeData.length > 0 ? Math.max(...safeData.map(d => d.ImprovementOverPDQPN || 0)) : 0;
  const avgImprovement = safeData.length > 0 ? 
    safeData.reduce((sum, d) => sum + (d.ImprovementOverPDQPN || 0), 0) / safeData.length : 0;
  const minConvergenceEpisode = safeData.length > 0 ? Math.min(...safeData.map(d => d.ConvergenceEpisode || 0)) : 0;
  const maxConvergenceEpisode = safeData.length > 0 ? Math.max(...safeData.map(d => d.ConvergenceEpisode || 0)) : 0;
  const maxWaitTime = safeData.length > 0 ? Math.max(...safeData.map(d => d.TotalWaitTime || 0)) : 0;

  // Updated episode statistics to show configuration breakdown
  const episodeStatsTable = useMemo(() => {
    const stats = {};
    Object.keys(episodeGroups).forEach(episodes => {
      const group = episodeGroups[episodes];
      const configBreakdown = {};
      
      group.forEach(row => {
        const config = row.Configuration;
        if (!configBreakdown[config]) {
          configBreakdown[config] = [];
        }
        configBreakdown[config].push(row);
      });
      
      stats[episodes] = {
        episodes: parseInt(episodes),
        configurations: configBreakdown,
        totalRuns: group.length
      };
    });
    return Object.values(stats).sort((a, b) => a.episodes - b.episodes);
  }, [episodeGroups]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Experimental Results Analysis</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Experiments</h3>
            <p className="text-3xl font-bold text-blue-600">{safeData.length}</p>
            <p className="text-sm text-gray-500">Across 3 configurations</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Best Performance</h3>
            <p className="text-3xl font-bold text-green-600">{minWaitTime.toFixed(1)}</p>
            <p className="text-sm text-gray-500">Lowest Total Wait Time</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Max Improvement</h3>
            <p className="text-3xl font-bold text-purple-600">{maxImprovement.toFixed(1)}%</p>
            <p className="text-sm text-gray-500">Over PDQPN Reference</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <label htmlFor="metric-select" className="text-sm font-medium text-gray-700">
                Metric:
              </label>
              <select
                id="metric-select"
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {metrics.map(metric => (
                  <option key={metric} value={metric}>{metric}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label htmlFor="view-select" className="text-sm font-medium text-gray-700">
                View:
              </label>
              <select
                id="view-select"
                value={selectedView}
                onChange={(e) => setSelectedView(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="episodes">By Episodes (Per Configuration)</option>
                <option value="configurations">By Configuration</option>
                <option value="runs">Individual Runs (Per Configuration)</option>
                <option value="scatter">Scatter Plot</option>
              </select>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {selectedView === 'episodes' ? 'Performance by Episode Count (Per Configuration)' :
             selectedView === 'configurations' ? 'Performance by Configuration' :
             selectedView === 'runs' ? 'Individual Run Comparison (Per Configuration)' : 'Correlation Analysis'}
          </h2>
          
          {selectedView === 'episodes' && renderEpisodesChart()}
          {selectedView === 'configurations' && renderConfigurationChart()}
          {selectedView === 'runs' && renderRunsChart()}
          {selectedView === 'scatter' && renderScatterChart()}
        </div>

        {/* Detailed Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Episode Statistics with Configuration Breakdown */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistics by Episode Count & Configuration</h3>
            <div className="space-y-4">
              {episodeStatsTable.map((episodeStat, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">{episodeStat.episodes} Episodes ({episodeStat.totalRuns} runs)</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.keys(episodeStat.configurations).map(config => {
                      const configRuns = episodeStat.configurations[config];
                      const avgWait = configRuns.reduce((sum, r) => sum + r.TotalWaitTime, 0) / configRuns.length;
                      const avgImprovement = configRuns.reduce((sum, r) => sum + r.ImprovementOverPDQPN, 0) / configRuns.length;
                      
                      return (
                        <div key={config} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                          <span className="font-medium text-gray-700">Config {config}:</span>
                          <span className="text-gray-600">
                            Wait: {avgWait.toFixed(1)}, Improvement: {avgImprovement.toFixed(1)}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Configuration Statistics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Configuration Analysis</h3>
            <div className="space-y-4">
              {configurationStats.map((config, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-gray-800">{config.configuration}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-2">
                    <div>Avg Wait: {config.avgWaitTime.toFixed(1)}</div>
                    <div>Std Dev: {config.stdWaitTime.toFixed(1)}</div>
                    <div>Min: {config.minWaitTime.toFixed(1)}</div>
                    <div>Max: {config.maxWaitTime.toFixed(1)}</div>
                    <div>Avg Conv: {config.avgConvergenceEpisode.toFixed(0)} ep</div>
                    <div>Runs: {config.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Performance Range</h4>
              <p className="text-sm text-blue-700">
                Total wait times range from {minWaitTime.toFixed(1)} to {maxWaitTime.toFixed(1)}, 
                showing significant variation across configurations.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">Average Improvement</h4>
              <p className="text-sm text-green-700">
                Average improvement over PDQPN reference is {avgImprovement.toFixed(1)}%, 
                with best case reaching {maxImprovement.toFixed(1)}%.
              </p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-medium text-purple-800 mb-2">Configuration Trends</h4>
              <p className="text-sm text-purple-700">
                Each configuration shows different performance patterns across episode counts,
                revealing optimal training durations per configuration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentalResultsAnalysis;