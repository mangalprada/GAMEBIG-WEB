import React, { useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';

type Props = {
  value: Descendant[];
  onChange?: (value: Descendant[]) => void;
  isReadOnly: boolean;
};

const Editor = ({ value, isReadOnly, onChange }: Props) => {
  const [editor] = useState(
    useMemo(() => withHistory(withReact(createEditor() as ReactEditor)), [])
  );
  return (
    <div className={'p-4  rounded-md ' + (isReadOnly ? '' : 'bg-gray-800')}>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          onChange && onChange(value);
        }}
      >
        <Editable
          readOnly={isReadOnly}
          placeholder="What's on your mind..."
          style={{ color: '#fff', fontSize: '1rem', fontWeight: 600 }}
        />
      </Slate>
    </div>
  );
};

export default Editor;
