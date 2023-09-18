export const formatTime = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Approximate, as months can have varying lengths
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years + "yrs";
  } else if (months > 0) {
    return months + "mons";
  } else if (days > 0) {
    return days + "days";
  } else if (hours > 0) {
    return hours + "hrs";
  } else if (minutes > 0) {
    return minutes + "m";
  } else {
    return seconds + "s";
  }
}

export const  formatDate = (inputDate) =>{
  const shortMonths = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const date = new Date(inputDate);
  const day = date.getDate();
  const month = shortMonths[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}

export const getCurrentDateTime = () =>{
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const now = new Date();

  const day = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'pm' : 'am';

  const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds} ${ampm}`;

  const formattedDate = `${day} ${month}, ${year}`;

  return `${formattedDate} ${formattedTime}`;
}

export const transformData = (inputData) =>{
  let transformedData = [];

  let prevMod1Values = null;

  for (const entry of inputData) {
      const mod1Values = entry.mod1;

      const nn = prevMod1Values
          ? prevMod1Values.reduce((sum, value) => sum + value, 0) / prevMod1Values.length
          : Math.min(...mod1Values);

      const hh = Math.max(...mod1Values);
      const ll = Math.min(...mod1Values);
      const avg = mod1Values.reduce((sum, value) => sum + value, 0) / mod1Values.length;

      transformedData.push({
          date: entry.x,
          open: nn,
          high: hh,
          low: ll,
          close: avg
      });

      prevMod1Values = mod1Values;
  }

  return transformedData;
}

export const transformDataMod2 = (inputData) =>{
  let transformedData = [];

  let prevMod1Values = null;

  for (const entry of inputData) {
      const mod1Values = entry.mod2;

      const nn = prevMod1Values
          ? prevMod1Values.reduce((sum, value) => sum + value, 0) / prevMod1Values.length
          : Math.min(...mod1Values);

      const hh = Math.max(...mod1Values);
      const ll = Math.min(...mod1Values);
      const avg = mod1Values.reduce((sum, value) => sum + value, 0) / mod1Values.length;

      transformedData.push({
          date: entry.x,
          open: nn,
          high: hh,
          low: ll,
          close: avg
      });

      prevMod1Values = mod1Values;
  }

  return transformedData;
}

// const inputData = [
//   { mod1: [64, 745, 846, 846, 645, 746, 76, 645, 87, 94], mod2: [64, 745, 846, 846, 645, 746, 76, 645, 87, 94], x: 217 },
//   { mod1: [64, 745, 846, 846, 645, 746, 76, 645, 87, 94], mod2: [64, 745, 846, 846, 645, 746, 76, 645, 87, 94], x: 247 }
// ];

// const transformedData = transformData(inputData);
// console.log(transformedData);


export const createNetworkGraph = (data) => {
    const nodesData = data.map(([accuracy, runtime, iterations, size], index) => ({
      id: index,
      accuracy,
      runtime,
      iterations,
      size
    }));

    const linksData = [];
    nodesData.forEach((sourceNode, sourceIndex) => {
      nodesData.forEach((targetNode, targetIndex) => {
        if (sourceIndex !== targetIndex) {
          const weight = sourceNode.iterations / targetNode.size;
          linksData.push({ source: sourceIndex, target: targetIndex, weight });
        }
      });
    });

    return { nodesData, linksData };
}