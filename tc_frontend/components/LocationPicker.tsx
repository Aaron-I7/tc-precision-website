import React, { useEffect, useRef, useState } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';

interface LocationPickerProps {
  initialLocation?: { lat: number; lng: number };
  onConfirm: (location: { lat: number; lng: number; address: string }) => void;
  onCancel: () => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ initialLocation, onConfirm, onCancel }) => {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const geocoderRef = useRef<any>(null);
  const [currentAddress, setCurrentAddress] = useState('');
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchText, setSearchText] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    let mapInstance: any = null;

    // Set Security Key BEFORE loading AMap
    // Note: If you have a security key, uncomment and set it here.
    // If you have bound the service domain in Amap console, this is not needed.
    // (window as any)._AMapSecurityConfig = {
    //   securityJsCode: 'YOUR_SECURITY_CODE',
    // };

    AMapLoader.load({
      key: '98eba7d653539b3a96d96b5f64a2c3c0', // User provided Web JS API Key
      version: '2.0',
      plugins: ['AMap.Geocoder', 'AMap.ToolBar', 'AMap.Scale'],
    })
      .then((AMap) => {
        const center = initialLocation ? [initialLocation.lng, initialLocation.lat] : [120.782874, 31.365372]; // Default to Suzhou
        
        mapInstance = new AMap.Map('map-container', {
          zoom: 15,
          center: center,
        });
        mapRef.current = mapInstance;

        // Initialize Geocoder
        geocoderRef.current = new AMap.Geocoder();

        // Add Marker
        const marker = new AMap.Marker({
          position: center,
          draggable: true,
          cursor: 'move',
        });
        marker.setMap(mapInstance);
        markerRef.current = marker;

        // Set initial state
        if (initialLocation) {
          setCurrentLocation(initialLocation);
          getAddress([initialLocation.lng, initialLocation.lat]);
        } else {
          getAddress(center as [number, number]);
        }

        // Map Click Event
        mapInstance.on('click', (e: any) => {
          const lnglat = [e.lnglat.getLng(), e.lnglat.getLat()];
          updateLocation(lnglat as [number, number]);
        });

        // Marker Drag Event
        marker.on('dragend', (e: any) => {
          const lnglat = [e.lnglat.getLng(), e.lnglat.getLat()];
          updateLocation(lnglat as [number, number]);
        });
      })
      .catch((e) => {
        console.error(e);
      });

    return () => {
      if (mapInstance) {
        mapInstance.destroy();
      }
    };
  }, []);

  const updateLocation = (lnglat: [number, number]) => {
    if (!mapRef.current || !markerRef.current) return;
    
    markerRef.current.setPosition(lnglat);
    // mapRef.current.setCenter(lnglat);
    
    setCurrentLocation({ lat: lnglat[1], lng: lnglat[0] });
    getAddress(lnglat);
  };

  const getAddress = (lnglat: [number, number]) => {
    if (!geocoderRef.current) return;
    
    geocoderRef.current.getAddress(lnglat, (status: string, result: any) => {
      if (status === 'complete' && result.regeocode) {
        setCurrentAddress(result.regeocode.formattedAddress);
      } else {
        setCurrentAddress('无法获取地址');
      }
    });
  };

  const handleSearch = async () => {
    if (!searchText) return;
    setSearching(true);
    try {
      // Use Amap Web Service API for Geocoding
      // This is more reliable than JS API for pure address search
      const key = '98eba7d653539b3a96d96b5f64a2c3c0'; // Web Service Key (Not JS API Key)
      // Use HTTPS to avoid mixed content error if the site is served over HTTPS
      // Or use a proxy if CORS is an issue. For now, direct HTTPS request.
      const response = await fetch(`https://restapi.amap.com/v3/geocode/geo?address=${encodeURIComponent(searchText)}&output=JSON&key=${key}`);
      const data = await response.json();
      
      if (data.status === '1' && data.geocodes && data.geocodes.length > 0) {
        const location = data.geocodes[0].location;
        const [lng, lat] = location.split(',').map(Number);
        const lnglat: [number, number] = [lng, lat];
        
        if (mapRef.current) {
          mapRef.current.setCenter(lnglat);
          mapRef.current.setZoom(17);
          updateLocation(lnglat);
        }
      } else {
        alert('未找到该地址，请尝试更详细的地址');
        console.warn('Geocoding response:', data);
      }
    } catch (error) {
      console.error('Geocoding failed:', error);
      alert('搜索失败，请检查网络或稍后重试');
    } finally {
      setSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const selectSearchResult = (tip: any) => {
      if (tip.location && tip.location.lat && tip.location.lng) {
          const lnglat: [number, number] = [tip.location.lng, tip.location.lat];
          mapRef.current?.setCenter(lnglat);
          mapRef.current?.setZoom(17);
          updateLocation(lnglat);
          setSearchText(tip.name);
          // 无需清空搜索结果，因未使用 setSearchResults 状态
      }
  }

  const handleConfirm = () => {
    if (currentLocation) {
      onConfirm({
        ...currentLocation,
        address: currentAddress
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
      <div className="bg-white rounded-2xl w-[800px] h-[600px] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-lg">选择地图坐标</h3>
          <button onClick={onCancel} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative">
          <div id="map-container" className="w-full h-full" />
          
          {/* Search Box */}
          <div className="absolute top-4 left-4 right-4 z-10 flex gap-2">
             <div className="relative flex-1">
                <input 
                    id="location-search-input"
                    type="text" 
                    className="w-full h-12 pl-12 pr-4 rounded-lg shadow-lg border-0 outline-none"
                    placeholder="输入详细地址 "
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
             </div>
             <button 
               onClick={handleSearch}
               disabled={searching || !searchText}
               className="h-12 px-6 bg-blue-600 text-white rounded-lg shadow-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
             >
               {searching ? '搜索中...' : '搜索定位'}
             </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-white">
          <div className="flex-1 mr-4">
            <div className="text-xs text-gray-500 mb-1">当前选中位置</div>
            <div className="font-bold text-sm truncate">{currentAddress || '请点击地图选择位置'}</div>
            <div className="text-xs text-gray-400 mt-1 font-mono">
                {currentLocation ? `${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}` : '未选择'}
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onCancel}
              className="px-6 py-2.5 rounded-lg font-bold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              取消
            </button>
            <button 
              onClick={handleConfirm}
              disabled={!currentLocation}
              className="px-6 py-2.5 rounded-lg font-bold bg-industrial-grey text-white hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              确定选择
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
