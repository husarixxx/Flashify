import Subject from "./Subject";
import MainButton from "./MainButton";
import Modal from "./Modal";

function SubjectList({
  subjects,
  type,
  createBtnText,
  modalForm,
  isModalOpen,
  modalClose,
  modalOpen,
  modalLoading,
}) {
  return (
    <>
      <div className="mx-4 p-4 md:mx-auto max-w-[1300px] ">
        <h2>My Subjects</h2>
        <div className="md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {subjects === null
            ? "Loading..."
            : subjects.map((subject) => (
                <Subject
                  key={crypto.randomUUID()}
                  subject={subject}
                  type={type}
                />
              ))}
        </div>
        <div className="flex justify-center mt-20 lg:mt-32">
          <MainButton
            text={`${createBtnText}`}
            styles={"py-2 px-6 lg:py-3 px-12"}
            onClick={modalOpen}
          ></MainButton>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          heading={
            <>
              Create <span className="text-purple-500">{type}</span> subject
            </>
          }
          modalClose={modalClose}
          modalLoading={modalLoading}
        >
          {modalForm}
        </Modal>
      )}
    </>
  );
}

export default SubjectList;
