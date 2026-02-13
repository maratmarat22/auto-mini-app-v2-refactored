import { useWizardStore } from '@/features/wizard/model/store';
import { Textarea } from '@telegram-apps/telegram-ui';

export const CommentStep = () => {
  const { comment, updateState } = useWizardStore();

  return (
    <Textarea
      value={comment ?? ''}
      onChange={(e) => updateState({ comment: e.target.value })}
      header="Комментарий"
      placeholder="Введите комментарий..."
      cols={30}
      rows={6}
      className="inputField"
      onFocus={(e) => {
        // Ждем долю секунды, чтобы клавиатура успела начать открываться
        setTimeout(() => {
          e.target.scrollIntoView({
            behavior: 'smooth', // Плавная прокрутка
            block: 'start', // Прокрутить до верхней границы экрана
          });
        }, 500);
      }}
    ></Textarea>
  );
};
