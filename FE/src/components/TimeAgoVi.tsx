import TimeAgo from "react-timeago";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import vi from "react-timeago/lib/language-strings/vi";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

const TimeAgoVi = ({ date }: { date: string }) => {
  const newDate = date?.toLocaleString();
  const formatter = buildFormatter(vi);
  return <TimeAgo date={newDate} formatter={formatter} />;
};

export default TimeAgoVi;
