<?php
namespace BulkImport\Form\Reader;

use Zend\Form\Element;

class SpreadsheetReaderParamsForm extends CsvReaderConfigForm
{
    public function init()
    {
        // Set binary content encoding
        $this->setAttribute('enctype', 'multipart/form-data');

        $this->add([
            'name' => 'file',
            'type' => Element\File::class,
            'options' => [
                'label' => 'Spreadsheet (csv, tsv, OpenDocument ods)', // @translate
            ],
            'attributes' => [
                'id' => 'file',
                'required' => true,
            ],
        ]);

        parent::init();
    }
}
