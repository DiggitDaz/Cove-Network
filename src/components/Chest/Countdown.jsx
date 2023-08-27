import { useState, useEffect } from 'react';
import { Space } from 'antd';
import { FaRegClock } from 'react-icons/fa';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

let formatter = new Intl.NumberFormat('en-US', {
  minimumIntegerDigits: 2,
});

const MyCountdown = ({ date, waitMessage, endMessage }) => {
  dayjs.extend(duration);
  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(dayjs(date).diff(dayjs()));
    }, 1000);
    return () => clearTimeout(interval);
  }, [date]);
  return (
    <Space>
      {timeLeft > 0 ? (
        <Space size={5}>
          <FaRegClock />
          {`${waitMessage} ${formatter.format(
            dayjs.duration(timeLeft).get('hours') +
              dayjs.duration(timeLeft).get('days') * 24
          )}:${formatter.format(
            dayjs.duration(timeLeft).get('minutes')
          )}:${formatter.format(dayjs.duration(timeLeft).get('seconds'))}`}
        </Space>
      ) : (
        endMessage
      )}
    </Space>
  );
};

export default MyCountdown;
