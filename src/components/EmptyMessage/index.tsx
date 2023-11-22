interface EmptyMessageProps<T> {
  condition: boolean;
  message: string;
  itemString: T[];
}

const EmptyMessage = <T,>({
  condition,
  message,
  itemString,
}: EmptyMessageProps<T>) => {
  return (
    <>
      {condition && itemString.length === 0 && (
        <div className="w-full text-center font-bold">{message}</div>
      )}
    </>
  );
};

export default EmptyMessage;
