import React from 'react';

function ErrorMessage({ error }) {
  // エラーメッセージがない場合は、コンポーネントを何も表示しない
  if (!error) {
    return null;
  }

  return (
    <div className="error-message" style={{ color: 'red', margin: '10px 0' }}>
      {error}
    </div>
  );
}

export default ErrorMessage;
