import { CandlestickData } from "lightweight-charts";



export function generateMockCandlestickData(count: number, startTime = Date.now() / 1000): CandlestickData[] {
    const data: CandlestickData[] = [];
    let lastClose = Math.random() * 100; 
  
    for (let i = 0; i < count; i++) {
      const time = Math.floor(startTime + i * 60);
  
      const open = lastClose;
      const change = (Math.random() - 0.5) * 20; 
      let close = open + change;
      close = Math.max(0, Math.min(100, close)); 
  
      const high = Math.max(open, close) + Math.random() * 5;
      const low = Math.min(open, close) - Math.random() * 5;
  
      data.push({
        time,
        open,
        high: Math.min(100, high),
        low: Math.max(0, low),
        close,
      });
  
      lastClose = close;
    }
  
    return data;
  }