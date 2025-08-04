
import { useSearchParams } from "react-router";
import { RouletteTableProbability } from "../../../graphql/generated/types"
import { GET_ROULETTE_TABLES_PROBABILITIES } from "../../../graphql/query/getRouletteTableProbabilities"
import { StraightUpButtons } from "./BetButtons"
import { useQuery } from "@apollo/client"
import { useState } from "react";


interface Props {
  // probabilities: RouletteTableProbability[]
  TableId: string;
  handleToggle: (tag: string) => void
}

const numbers = [
  {
    number: 1,
    color: "red"
  },
  {
    number: 2,
    color: "black"
  },
  {
    number: 3,
    color: "red"
  },
  {
    number: 4,
    color: "black"
  },
  {
    number: 5,
    color: "black"
  },
  {
    number: 6,
    color: "red"
  },
  {
    number: 7,
    color: "red"
  },
  {
    number: 8,
    color: "black"
  },
  {
    number: 9,
    color: "red"
  },
  {
    number: 10,
    color: "black"
  },
  {
    number: 11,
    color: "black"
  },
  {
    number: 12,
    color: "red"
  },
  {
    number: 13,
    color: "red"
  },
  {
    number: 14,
    color: "black"
  },
  {
    number: 15,
    color: "red"
  },
  {
    number: 16,
    color: "black"
  },
  {
    number: 17,
    color: "red"
  },
  {
    number: 18,
    color: "black"
  },
  {
    number: 19,
    color: "red"
  },
  {
    number: 20,
    color: "black"
  },
  {
    number: 21,
    color: "black"
  },
  {
    number: 22,
    color: "red"
  },
  {
    number: 23,
    color: "red"
  },
  {
    number: 24,
    color: "black"
  },
  {
    number: 25,
    color: "red"
  },
  {
    number: 26,
    color: "black"
  },
  {
    number: 27,
    color: "red"
  },
  {
    number: 28,
    color: "black"
  },
  {
    number: 29,
    color: "red"
  },
  {
    number: 30,
    color: "black"
  },
  {
    number: 31,
    color: "black"
  },
  {
    number: 32,
    color: "red"
  },
  {
    number: 33,
    color: "red"
  },
  {
    number: 34,
    color: "black"
  },
  {
    number: 35,
    color: "red"
  },
  {
    number: 36,
    color: "black"
  },
  {
    number: 0,
    color: "green"
  }
]
const StraightUpButton = ({ handleToggle, TableId }: Props) => {

  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const resultsParam = searchParams.get('results');
  const probabilitiesResultLimit = resultsParam ? parseInt(resultsParam) : 250;


  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);


  const { data: probabilities } = useQuery(GET_ROULETTE_TABLES_PROBABILITIES, {
    variables: {
      request: {
        TableId,
        GameType: 'StraightUp',
        StartDate: startDate.toISOString(),
        EndDate: endDate.toISOString(),
        ProbabilitiesResultLimit: probabilitiesResultLimit

      }
    },
    skip: !open,
  })


  const getProbabilityByTag = (tag: string): number => {
    if (!probabilities) return 0;
    const prob = probabilities.GetRouletteTableProbabilities.Probabilities.find((p: RouletteTableProbability) => p.Tag === tag);
    return prob ? Math.round(prob.Value * 100) : 0;
  };



  const getStraightUpProbabilities = () => {
    return numbers.map(number => ({
      number: number.number,
      straightUpPercentage: getProbabilityByTag(`${number.number}`)
    }))
  }

  return (
    <div className="mt-4">
      <button className="w-full" onClick={() => setOpen((prev) => !prev)}>
        <h2 className={`text-[#FFFFFF99] hover:text-[#FFFFFF] transition-all duration-300 text-[11px] font-bold underline cursor-pointer ${open ? 'text-[#FFFFFF]' : ''}`}>Pleno</h2>
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden ${open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
      >
        <StraightUpButtons probabilities={getStraightUpProbabilities()} handleToggle={handleToggle} />
      </div>
    </div>
  )
}

export default StraightUpButton