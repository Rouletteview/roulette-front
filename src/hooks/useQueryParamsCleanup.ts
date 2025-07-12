import { useEffect, useRef } from 'react';

export const useQueryParamsCleanup = () => {
    const previousParams = useRef<string>('');

    useEffect(() => {
        const currentParams = window.location.search;


        if (previousParams.current && previousParams.current !== currentParams) {
      

      
            const oldParams = new URLSearchParams(previousParams.current);
            const oldChartType = oldParams.get('chartType');
            const oldGameType = oldParams.get('chartZone');
            const oldTable = oldParams.get('table');

          
            const keysToRemove = Object.keys(sessionStorage).filter(key => {
                if (!key.startsWith('chartPosition_')) return false;

            
                return (
                    (oldChartType && key.includes(oldChartType)) ||
                    (oldGameType && key.includes(oldGameType)) ||
                    (oldTable && key.includes(oldTable))
                );
            });

            keysToRemove.forEach(key => {
                sessionStorage.removeItem(key);
             
            });
        }

        previousParams.current = currentParams;
    });
}; 