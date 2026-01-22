/* eslint-disable @typescript-eslint/no-explicit-any */
function BaseError({
  errors,
  className,
}: {
  errors?: any;
  className?: string;
}) {
  return (
    <>
      {errors && (
        <div className={className}>
          <p className="text-sm text-red-500">{errors}</p>
        </div>
      )}
    </>
  );
}

export default BaseError;
