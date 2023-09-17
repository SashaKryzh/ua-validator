import { Head, Layout, NoSSRWrapper } from "@/components";
import { prisma } from "@/server/db/client";
import { Button } from "@/components/ui/Button";
import Chip from "@/ui/Chip";
import Dropdown from "@/ui/Dropdown";
import { GradientContainer } from "@/ui/GradientContainer";
import { TextArea } from "@/ui/Input";
import Photo from "@/ui/Photo";
import SelectBox from "@/ui/SelectBox";
import Spacer from "@/ui/Spacer";
import type { Job, Nationality } from "@prisma/client";
import type { FieldProps, FormikErrors } from "formik";
import { Field, FieldArray, Form, Formik, useField } from "formik";
import type { GetServerSideProps } from "next";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ViewOnWarCode } from "shared/common_types";
import * as yup from "yup";
import type { NextPageWithLayout } from "./_app";
import InputField from "@/components/InputField";

interface AddTargetProps {
  jobs: Job[];
  nationalities: Nationality[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const jobs = await prisma?.job.findMany();
  const nationalities = await prisma?.nationality.findMany();

  return {
    props: {
      jobs,
      nationalities,
    },
  };
};

interface AddTargetForm {
  photo: string;
  realName: string;
  nicknames: string[];
  viewOnWar?: ViewOnWarCode;
  jobs: string[];
  resourceLinks: string[];
  nationality?: string;
  proof: string;
  proofLinks: string[];
  photos: string[];
  email: string;
}

// TODO: Remove call to db on page open. Make this page static.

const AddTarget: NextPageWithLayout<AddTargetProps> = (props) => {
  const { t } = useTranslation();
  // const router = useRouter();
  // const [unsavedChanges, setUnsavedChanges] = useState(true);

  // usePreventNavigation(router, unsavedChanges, "You have unsaved changes");

  // const handleSubmit: React.MouseEventHandler = (e) => {
  //   e.preventDefault();
  //   // setUnsavedChanges(false);
  //   // router.replace("/");
  // };

  const initialValues: AddTargetForm = {
    photo: "",
    realName: "",
    nicknames: [""],
    viewOnWar: undefined,
    jobs: [],
    nationality: undefined,
    resourceLinks: [""],
    proof: "",
    proofLinks: [""],
    photos: [],
    email: "",
  };

  const validate = (values: AddTargetForm) => {
    const errors: FormikErrors<AddTargetForm> = {};

    if (!values.nicknames.find((n) => n !== "")) {
      errors.nicknames = "Required";
    }

    if (!values.resourceLinks.find((n) => n !== "")) {
      errors.resourceLinks = "Required";
    }

    if (!values.proofLinks.find((n) => n !== "")) {
      errors.proofLinks = "Required";
    }

    return errors;
  };

  const validationSchema = yup.object().shape({
    realName: yup.string().min(2),
    nicknames: yup.array().of(yup.string()).required(),
    viewOnWar: yup.mixed().oneOf(Object.values(ViewOnWarCode)).required(),
    jobs: yup
      .array(yup.mixed().oneOf(props.jobs.map((j) => j.code)))
      .required()
      .min(1),
    resourceLinks: yup.array().of(yup.string().url()).required().min(1),
    nationality: yup.mixed().oneOf(props.nationalities.map((n) => n.code)),
    proof: yup.string().min(30),
    proofLinks: yup.array().of(yup.string().url()),
    email: yup.string().email(),
  });

  return (
    <>
      <Head title={"Додати людину"} />
      <Spacer className="h-16" />
      <div className="mx-auto max-w-screen-sm px-2 ">
        <GradientContainer>
          <div className=" px-4 py-5 text-sm font-light">
            <span className="font-normal">
              На жаль, ця частина ще не готова
            </span>
            , але Ви можете відправити нам інформацію на пошту{" "}
            <a
              className="font-mono text-blue-600"
              href="mailto:sad.xprod@gmail.com"
            >
              sad.xprod@gmail.com
            </a>{" "}
            🙂
          </div>
        </GradientContainer>
      </div>
      <Spacer className="h-16" />
      <div className="relative">
        <div className="absolute z-50 h-full w-full bg-red-500 opacity-5" />
        <NoSSRWrapper>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              console.log({ values, actions });
            }}
            validationSchema={validationSchema}
            validateOnChange={true}
            validate={validate}
          >
            {(formik) => {
              return (
                <Form>
                  <div className="flex flex-col items-center px-2">
                    <div className="w-full max-w-screen-md"></div>
                    <div className="flex w-full max-w-lg flex-col">
                      <Spacer className="h-6" />
                      <Photo className="w-1/2 self-center" />
                      <Spacer className="h-6" />
                      <InputField
                        name="realName"
                        autoComplete="off"
                        placeholderLabel={t("page.add-target.real-name")}
                      />
                      <SectionHeader
                        title={t("page.add-target.section-header.nickname")}
                      />
                      <InputFieldArray
                        name="nicknames"
                        placeholderLabel="Псевдонім"
                      />
                      <SectionHeader
                        title={t("page.add-target.section-header.view-on-war")}
                      />
                      <ViewOnWar />
                      <SectionHeader
                        title={t("page.add-target.section-header.job")}
                      />
                      <Field name="jobs">
                        {({ field, form, meta }: FieldProps) => {
                          return (
                            <div className="flex flex-wrap gap-1.5">
                              {props.jobs.map((job, i) => (
                                <Chip
                                  key={i}
                                  label={job.code}
                                  selected={meta.value.includes(job.code)}
                                  onClick={() => {
                                    let nextValue = [...meta.value];
                                    if (meta.value.includes(job.code)) {
                                      nextValue = nextValue.filter(
                                        (j) => j !== job.code,
                                      );
                                    } else {
                                      nextValue.push(job.code);
                                    }
                                    form.setFieldValue(field.name, nextValue);
                                  }}
                                />
                              ))}
                            </div>
                          );
                        }}
                      </Field>
                      <SectionHeader
                        title={t("page.add-target.section-header.resourses")}
                        subtitle={t(
                          "page.add-target.section-header.resourses.subtitle",
                        )}
                      />
                      <InputFieldArray
                        name="resourceLinks"
                        placeholderLabel={`Посилання`}
                      />
                      <Spacer className="h-5" />
                      <Field name="nationality">
                        {({ field, form, meta }: FieldProps) => {
                          const options = [
                            ...props.nationalities.map((n) => n.code),
                            "Unknown",
                          ];

                          return (
                            <Dropdown
                              placeholderLabel={t(
                                "page.add-target.section-header.nationality",
                              )}
                              selected={meta.value}
                              options={options}
                              onChange={(value) =>
                                form.setFieldValue(
                                  field.name,
                                  value === "Unknown" ? null : value,
                                )
                              }
                            />
                          );
                        }}
                      </Field>
                      <SectionHeader
                        title={
                          <div className="text-h3">
                            Підтвердження позиції людини
                          </div>
                        }
                        subtitle={
                          <div className="text-h8">
                            Заповніть хоча б{" "}
                            <span className="font-bold">
                              одне з полів нижче
                            </span>
                            .
                          </div>
                        }
                      />
                      <Field name="proof">
                        {({ field, meta }: FieldProps) => {
                          return (
                            <TextArea
                              id="proof"
                              placeholderLabel="Короткий опис дій людини"
                              autoComplete="off"
                              error={meta.touched ? meta.error : undefined}
                              {...field}
                            />
                          );
                        }}
                      </Field>
                      <SectionHeader
                        title={t("page.add-target.section-header.evidence")}
                        subtitle={t(
                          "page.add-target.section-header.evidence.subtitle",
                        )}
                      />
                      <InputFieldArray
                        name="proofLinks"
                        placeholderLabel="Посилання"
                      />
                      <SectionHeader
                        title="Фотопідтвердження доказів (до 10)"
                        subtitle="Фото або скріни на яких видно ставлення людини до війни в Україні"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Photo />
                        <Photo />
                      </div>
                      <Spacer className="h-10" />
                      <GradientContainer>
                        <div className="flex flex-col px-4 py-5 text-h8">
                          <div className="text-h4">Про додавання</div>
                          <br />
                          <p>
                            Після додавання людини, вона буде перевірена адміном
                            і додана на сайт.
                          </p>
                          <br />
                          <p>
                            Якщо бажаєте{" "}
                            <span className="font-bold">
                              отримати сповіщення
                            </span>
                            , коли адмін перевірить додану вами людини, будь
                            ласка, залишіть ваш email.
                          </p>
                          <br />
                          <InputField
                            name="email"
                            showError={true}
                            placeholderLabel="Ваш email (необовʼязково)"
                          />
                        </div>
                      </GradientContainer>
                      <Spacer className="h-10" />
                      <Button className="rounded-full" type="submit">
                        Додати
                      </Button>
                      <Spacer className="h-10" />
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </NoSSRWrapper>
      </div>
    </>
  );
};

AddTarget.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default AddTarget;

//

function SectionHeader(props: {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
}) {
  return (
    <div className="pb-3 pt-6">
      <h2 className="text-h5">{props.title}</h2>
      {props.subtitle && (
        <>
          <Spacer className="h-1" />
          <div className="text-h8 opacity-50">{props.subtitle}</div>
        </>
      )}
    </div>
  );
}

function ViewOnWar() {
  const { t } = useTranslation();
  const [field, meta, helpers] = useField("viewOnWar");

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        {/*TODO: investigate general approach how to prevent internal properties from passing to standard once*/}
        <SelectBox
          label={t(`ViewOnWarCode.${ViewOnWarCode.WITH_UKRAINE}`)}
          value1={ViewOnWarCode.WITH_UKRAINE}
          groupValue={meta.value}
          className="grow py-5"
          handleClick={(i) => helpers.setValue(i)}
        />
        <SelectBox
          label={t(`ViewOnWarCode.${ViewOnWarCode.WITH_ORKY}`)}
          value1={ViewOnWarCode.WITH_ORKY}
          groupValue={meta.value}
          className="grow py-5"
          handleClick={(i) => helpers.setValue(i)}
        />
      </div>
      <SelectBox
        label={t(`ViewOnWarCode.${ViewOnWarCode.PEACE_DEATH}`)}
        value1={ViewOnWarCode.PEACE_DEATH}
        groupValue={meta.value}
        className="py-5"
        handleClick={(i) => helpers.setValue(i)}
      />
      <SelectBox
        label={t(`ViewOnWarCode.${ViewOnWarCode.QUIET}`)}
        value1={ViewOnWarCode.QUIET}
        groupValue={meta.value}
        className="py-5"
        handleClick={(i) => helpers.setValue(i)}
      />
    </div>
  );
}

const InputFieldArray = (props: { name: string; placeholderLabel: string }) => {
  const [field, meta, helpers] = useField<string[]>(props.name);

  const values = meta.value;
  const error = meta.error;

  return (
    <FieldArray
      name={props.name}
      render={(arrayHelpers: unknown) => {
        const errorString = typeof error === "string" && error;

        return (
          <div className="flex flex-col gap-2.5">
            {/* TODO: make better error component */}
            {meta.touched && errorString && (
              <p className="text-error">{errorString}</p>
            )}
            {values.map((value, i) => (
              <InputField
                key={i}
                name={`${props.name}.${i}`}
                showError={!errorString}
                autoComplete="off"
                placeholderLabel={`${props.placeholderLabel} ${i + 1}`}
              />
            ))}
            {meta.value.length < 10 && (
              <AddMoreButton
                onClick={() => console.log("more") /* arrayHelpers.push("") */}
              />
            )}
          </div>
        );
      }}
    />
  );
};

const AddMoreButton = (props: { onClick: () => void }) => {
  return (
    <Button type="button" variant="ghost" onClick={props.onClick}>
      Add more
    </Button>
  );
};
