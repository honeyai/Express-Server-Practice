const catchAsyncErrors = fn => (
  (request, response, next) => {
    const routePromise = fn(request, response, next);
    if (routePromise.catch) {
      routePromise.catch(error => next(error));
    }
  }
);

exports.catchAsync = catchAsyncErrors;