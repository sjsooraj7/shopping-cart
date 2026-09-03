import Skeleton from "@mui/material/Skeleton";

export function ProductSkeleton() {
  return (
    <div className="card h-100 shadow-sm">
      <Skeleton variant="rectangular" height={220} animation="wave" />

      <div className="card-body">
        <Skeleton variant="text" height={30} width="80%" animation="wave" />

        <Skeleton variant="text" height={24} width="50%" animation="wave" />

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Skeleton variant="text" height={30} width={70} animation="wave" />

          <Skeleton variant="text" height={25} width={50} animation="wave" />
        </div>

        <Skeleton variant="rounded" height={38} width="100%" animation="wave" />
      </div>
    </div>
  );
}
