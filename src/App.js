import React, { useEffect, useState } from 'react';
import './App.css';
import { Transfer } from 'antd';

function App() {
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);

  useEffect(() => {
    getMock();
  }, []);

  const getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    setMockData(mockData);
    setTargetKeys(targetKeys);
  };

  const handleChange = (targetKeys) => {
    setTargetKeys(targetKeys);
  };

  return (
    <div className="App">
      <h1>Data Tranfer Between Two Buckets</h1>
      <Transfer
        dataSource={mockData}
        showSearch
        listStyle={{
          width: 300,
          height: 350,
        }}
        operations={['Forward', 'Backward']}
        targetKeys={targetKeys}
        onChange={handleChange}
        render={(item) => `${item.title}-${item.description}`}
      />
    </div>
  );
}

export default App;
