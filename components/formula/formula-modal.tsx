import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormulaChunk } from '@/app/formula/data';
import { FormulaVisualization } from './formula-visualization';

interface FormulaModalProps {
  isOpen: boolean;
  selectedChunk: FormulaChunk | null;
  parameters: Record<string, number>;
  onClose: () => void;
  onParameterChange: (paramName: string, value: number) => void;
  onBackdropClick: (e: React.MouseEvent) => void;
  modalRef: React.RefObject<HTMLDivElement>;
}

export function FormulaModal({ 
  isOpen, 
  selectedChunk, 
  parameters, 
  onClose, 
  onParameterChange, 
  onBackdropClick, 
  modalRef 
}: FormulaModalProps) {
  if (!isOpen || !selectedChunk) return null;

  const renderModalFormula = (chunk: FormulaChunk) => {
    const { renderComponent } = chunk;
    
    if (renderComponent.type === 'fraction') {
      return (
        <div className="flex items-center justify-center text-4xl font-light text-gray-900 dark:text-white mb-4">
          <div className="flex flex-col items-center">
            <div className="text-3xl mb-2">{renderComponent.numerator}</div>
            <div className="w-24 h-0.5 bg-current mb-2"></div>
            <div className="text-2xl">{renderComponent.denominator}</div>
          </div>
        </div>
      );
    }
    
    if (renderComponent.type === 'exponential') {
      return (
        <div className="flex items-center justify-center text-4xl font-light text-gray-900 dark:text-white mb-4">
          <div className="flex items-start">
            <span className="text-4xl">{renderComponent.base}</span>
            {renderComponent.exponent?.numerator && (
              <div className="flex flex-col items-center ml-2 -mt-1">
                <div className="text-2xl">{renderComponent.exponent.numerator}</div>
                {renderComponent.exponent.denominator && (
                  <>
                    <div className="w-20 h-0.5 bg-current mb-1"></div>
                    <div className="text-lg">{renderComponent.exponent.denominator}</div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onBackdropClick}
    >
      <div 
        ref={modalRef}
        className="glass-panel bg-white/90 dark:bg-black/90 border border-gray-200 dark:border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="text-center mb-4">
              {renderModalFormula(selectedChunk)}
            </div>
            <h2 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mb-2 text-center">
              {selectedChunk.displayName}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Sub-formula Analysis
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 ml-4"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="mb-6 p-4 bg-gray-50 dark:bg-white/5 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {selectedChunk["7Vector"].narrative}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            7-Vector Properties
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(selectedChunk["7Vector"]).filter(([key]) => key !== 'narrative').map(([key, value]) => (
              <div key={key} className="p-3 bg-gray-100 dark:bg-white/5 rounded-lg">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {key}
                </div>
                <div className="text-gray-900 dark:text-white">
                  {value as string}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/10 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Interactive Visualization
          </h3>
          <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4">
            <FormulaVisualization
              chunk={selectedChunk}
              parameters={parameters}
              onParameterChange={onParameterChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}