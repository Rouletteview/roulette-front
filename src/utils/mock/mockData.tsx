


 
export function generateMockCandlestickData(data: any) {

  const LastNumbers = data.GetRouletteById;

  const candleData = LastNumbers.map(item => ({
    time: Math.floor(new Date(item.WinAt).getTime() / 1000), // Unix timestamp (segundos)
    open: item.Number,
    high: item.Number,
    low: item.Number,
    close: item.Number,
  }));
  return candleData
}



const mockData = () => {
  return (
    <div>
      
    </div>
  )
}

export default mockData
