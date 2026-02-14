import { useWizardStore } from '@/features/wizard/model/store/store';
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
      className="input"
      onFocus={(e) => {
        setTimeout(() => {
          e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 600);
      }}
    ></Textarea>
  );
};
