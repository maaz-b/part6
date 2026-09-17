import {
  useGood,
  useAvg,
  useBad,
  useNeutral,
  usePositivePercentage,
  useAll,
} from "./store";
const Statistics = () => {
  const good = useGood();
  const neutral = useNeutral();
  const bad = useBad();
  const all = useAll();
  const average = useAvg();
  const positive = usePositivePercentage();

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positive}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
