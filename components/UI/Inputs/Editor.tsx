import React, { useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';

type Props = {
  value: Descendant[];
  onChange?: (value: Descendant[]) => void;
  isreadOnly: boolean;
};

const Editor = ({ value, isreadOnly, onChange }: Props) => {
  const editor = useMemo(
    () => withHistory(withReact(createEditor() as ReactEditor)),
    []
  );
  return (
    <div className="p-4 bg-gray-800 rounded-md">
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          onChange && onChange(value);
        }}
      >
        <Editable
          readOnly={isreadOnly}
          placeholder="What's on your mind..."
          style={{ color: '#fff', fontSize: '1rem', fontWeight: 600 }}
        />
      </Slate>
    </div>
  );
};

export default Editor;
