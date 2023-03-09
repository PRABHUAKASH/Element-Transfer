import React, { useState } from 'react';

const TransferComponent = () => {
  const [bucket1, setBucket1] = useState(['element1', 'element2', 'element3']); // initial elements in bucket1
  const [bucket2, setBucket2] = useState([]); // initial empty bucket2

  const transferElement = (sourceBucket, destinationBucket, element) => {
    // Remove the element from the source bucket
    const newSourceBucket = sourceBucket.filter(e => e !== element);
    // Add the element to the destination bucket
    const newDestinationBucket = [...destinationBucket, element];
    // Update the state of both buckets
    setBucket1(sourceBucket === bucket1 ? newSourceBucket : bucket1);
    setBucket2(sourceBucket === bucket2 ? newSourceBucket : bucket2);
  }

  const transferSelectedElements = (sourceBucket, destinationBucket) => {
    // Get the selected elements from the source bucket
    const selectedElements = document.querySelectorAll(`#${sourceBucket} input[type=checkbox]:checked`);
    // Loop through the selected elements and transfer them to the destination bucket
    selectedElements.forEach(el => {
      transferElement(sourceBucket === 'bucket1' ? bucket1 : bucket2, sourceBucket === 'bucket1' ? bucket2 : bucket1, el.value);
    });
  }

  const transferAllElements = (sourceBucket, destinationBucket) => {
    // Transfer all elements from the source bucket to the destination bucket
    sourceBucket === 'bucket1' ? setBucket2(bucket1) : setBucket1(bucket2);
    // Clear the source bucket
    sourceBucket === 'bucket1' ? setBucket1([]) : setBucket2([]);
  }

  return (
    <div>
      <h2>Bucket 1</h2>
      <ul id="bucket1">
        {bucket1.map(element => (
          <li key={element}>
            <input type="checkbox" value={element} />
            {element}
          </li>
        ))}
      </ul>
      <button onClick={() => transferSelectedElements('bucket1', 'bucket2')}>
        Transfer selected elements to Bucket 2
      </button>
      <button onClick={() => transferAllElements('bucket1', 'bucket2')}>
        Transfer all elements to Bucket 2
      </button>

      <h2>Bucket 2</h2>
      <ul id="bucket2">
        {bucket2.map(element => (
          <li key={element}>
            <input type="checkbox" value={element} />
            {element}
          </li>
        ))}
      </ul>
      <button onClick={() => transferSelectedElements('bucket2', 'bucket1')}>
        Transfer selected elements to Bucket 1
      </button>
      <button onClick={() => transferAllElements('bucket2', 'bucket1')}>
        Transfer all elements to Bucket 1
      </button>
    </div>
  );
};

export default TransferComponent;
