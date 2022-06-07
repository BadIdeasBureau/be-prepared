class PrepareForm extends FormApplication{
    constructor(actor, options){
        super(actor,options)
        this.actor = actor
    }
    
    static get defaultOptions(){
        const defaults = super.defaultOptions;

        const overrides = {
            height: "auto",
            id: "be-prepared",
            title:  "Spell Preparation"
        };

        const mergedOptions = foundry.utils.mergeObject(defaults, overrides)

        return mergedOptions
    }

    getData(){
        //spell data, incl name, image, preparation - maybe just the whole spellData
        //options, if required
        //actor name
        //max number of prepped spells (per class?)
    }

    maxPrepped(){
        //Druid: wis+level
        //Cleric: Wis+level
        //Wizard: Int+level
        //Artificer: int + 1/2 level
        //Paladin: Cha + 1/2 level
        //General case: Spellcasting stat + (caster type)*level
    }

    _updateObject(event, formData) {
        const updateData = [];
        let spellDatas = actor.items.filter(i => i.data.type === "spell" && i.data.data.level > 0 && i.data.data.preparation?.mode === "prepared").map(i=> foundry.utils.deepClone(i.data))
        for (let spell of spellDatas){
            let prepared = 0   //get prepared state from form
            if(prepared != spell.data.preparation.prepared){
                updateData.push({
                    _id: spell.id, 
                    data:{preparation: {prepared}}
                })
            }
        }
        this.actor.updateEmbeddedDocuments("Item", updateData)
        
    }

}

