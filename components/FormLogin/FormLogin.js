const FormLogin = ({ formik }) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      {/* disable autofill */}
      <input type="email" hidden />
      <input type="password" hidden />

      <div className="mb-4 text-left">
        <div className="form-float relative">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            className={`${
              formik.touched.email && formik.errors.email ? "input-error" : ""
            } input-df pr-2 pb-2 pl-4 pt-6`}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            autoComplete="off"
          />
          <label
            htmlFor="email"
            className={`${
              formik.touched.email && formik.errors.email ? "!text-red-100" : ""
            }`}
          >
            Email
          </label>
        </div>
        {formik.touched.email && formik.errors.email && (
          <p className="mt-1 text-xs text-red-100">{formik.errors.email}</p>
        )}
      </div>
      <div className="mb-4 text-left">
        <div className="form-float relative">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Mật khẩu"
            className={`${
              formik.touched.password && formik.errors.password
                ? "input-error"
                : ""
            } input-df pr-2 pb-2 pl-4 pt-6`}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            autoComplete="off"
          />
          <label
            htmlFor="password"
            className={
              formik.touched.password && formik.errors.password
                ? "!text-red-100"
                : ""
            }
          >
            Mật khẩu
          </label>
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="text-red fs-sm">{formik.errors.password}</p>
        )}
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="rememberMe"
          name="rememberMe"
          onChange={formik.handleChange}
        />
        <label htmlFor="rememberMe" className="ml-2 cursor-pointer select-none">
          Ghi nhớ đăng nhập
        </label>
      </div>
      <div className="d-flex justify-content-center">
        {formik.isSubmitting ? (
          <button
            disabled
            className="btn--df btn--green btn-spinner w-full cursor-wait py-2 uppercase"
            type="submit"
          >
            <div
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </button>
        ) : (
          <button
            className="btn--df btn--green w-full py-2 uppercase"
            type="submit"
          >
            Đăng nhập
          </button>
        )}
      </div>
    </form>
  );
};

export default FormLogin;
