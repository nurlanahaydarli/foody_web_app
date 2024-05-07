export function convertSnapshotToArray(snapshot) {
  // const data = [];
  // snapshot.forEach((doc) => {
  //   const item = {
  //     id: doc.id,
  //     ...doc.data(),
  //   };

  //   data.push(item);
  // });

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}
