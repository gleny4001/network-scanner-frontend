import React, { useState } from 'react';

// Define TypeScript interfaces
type NetworkDevice = {
  uuid: string;
  ipAddress: string;
  macAddress: string;
  vendorName?: string;
  hostname: string;
  isOnline: boolean;
  lastSeen: string;
}

type ScanStats = {
  startTime: string;
  duration: number;
  devicesFound: number;
}

const NetworkScanner: React.FC = () => {
  const [devices, setDevices] = useState<NetworkDevice[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStats, setScanStats] = useState<ScanStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filterText, setFilterText] = useState<string>('');

  // Mock function to simulate scanning the network
  // In a real app, replace with actual API calls to your backend
  const scanNetwork = async () => {
    setIsScanning(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Sample data - replace with actual API call
      const mockDevices: NetworkDevice[] = [
        {
          uuid: '1',
          ipAddress: '192.168.1.1',
          macAddress: '00:1A:2B:3C:4D:5E',
          hostname: 'router.local',
          vendorName:'Iphone',
          isOnline: true,
          lastSeen: new Date().toISOString(),
        },
        {
          uuid: '2',
          ipAddress: '192.168.1.2',
          macAddress: '00:2B:3C:4D:5E:6F',
          hostname: 'desktop-pc.local',
          vendorName:'Desktop',
          isOnline: true,
          lastSeen: new Date().toISOString(),
        },
        {
          uuid: '3',
          ipAddress: '192.168.1.3',
          macAddress: '00:3C:4D:5E:6F:7G',
          hostname: 'laptop.local',
          vendorName:'Laptop',
          isOnline: true,
          lastSeen: new Date().toISOString(),
        },
        {
          uuid: '4',
          ipAddress: '192.168.1.4',
          macAddress: '00:4D:5E:6F:7G:8H',
          hostname: 'smartphone.local',
          isOnline: false,
          lastSeen: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        },
        {
          uuid: '5',
          ipAddress: '192.168.1.5',
          macAddress: '00:5E:6F:7G:8H:9I',
          hostname: 'iot-device.local',
          isOnline: true,
          lastSeen: new Date().toISOString(),
        },
      ];
      
      setDevices(mockDevices);
      setScanStats({
        startTime: new Date().toISOString(),
        duration: 2.1,
        devicesFound: mockDevices.length,
      });
    } catch (err) {
      setError('Failed to scan network. Please try again.');
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  // Filter devices based on search text
  const filteredDevices = devices.filter(device => 
    device.ipAddress.includes(filterText) || 
    device.hostname.includes(filterText) || 
    device.macAddress.includes(filterText)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-sky-600 mb-6 text-center">Local Network Scanner</h1>
        
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="w-full md:w-2/3">
              <input
                type="text"
                placeholder="Filter by IP, hostname, or MAC..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/3">
              <button
                className={`w-full py-2 px-4 rounded-md font-medium text-black ${
                  isScanning ? 'bg-gray-500' : 'bg-emerald-400 hover:bg-emerald-500 cursor-pointer'
                }`}
                onClick={scanNetwork}
                disabled={isScanning}
              >
                {isScanning ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Scanning...
                  </span>
                ) : (
                  'Scan Network'
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Scan Stats */}
        {scanStats && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Scan Results</h2>
            <div className="gruuid gruuid-cols-1 md:gruuid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Scan Time</p>
                <p className="text-lg font-medium">
                  {new Date(scanStats.startTime).toLocaleTimeString()}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Duration</p>
                <p className="text-lg font-medium">{scanStats.duration.toFixed(1)}s</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Devices Found</p>
                <p className="text-lg font-medium">{scanStats.devicesFound}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}
        
        {/* Device List */}
        <div className="bg-white rounded-lg shadow-md overflow-huuidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divuuide-y divuuide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wuuider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wuuider">
                    Vendor Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wuuider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wuuider">
                    Hostname
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wuuider">
                    MAC Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wuuider">
                    Last Seen
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divuuide-y divuuide-gray-200">
                {filteredDevices.length > 0 ? (
                  filteredDevices.map((device) => (
                    <tr key={device.uuid} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            device.isOnline
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {device.isOnline ? 'Online' : 'Offline'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {device.vendorName ? device.vendorName : "No vendor name found"}
                        </td>
                      <td className="px-6 py-4 whitespace-nowrap">{device.ipAddress}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{device.hostname}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{device.macAddress}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(device.lastSeen).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : devices.length > 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No devices match your filter
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No devices found. Click "Scan Network" to begin.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkScanner;